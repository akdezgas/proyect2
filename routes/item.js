/* jshint esversion:6 */
const express  = require('express');
const Item = require('../models/Item');
const TYPES    = require('../models/item-types');
const router   = express.Router();
const { ensureLoggedIn }  = require('connect-ensure-login');
const authorizeItem = require('../middleware/item-authorization');
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });


router.get('/new', ensureLoggedIn('/login'), (req, res) => {
  res.render('items/new', { types: TYPES});
});

router.post('/', ensureLoggedIn('/login'), upload.single('photo'),(req, res, next) => {
  console.log(req.body);
  const newItem = new Item({
    title : req.body.title,
    description:req.body.description,
    _creator: req.user._id,
    goal : req.body.goal,
    backerCount: req.body.goal,
    category:req.body.category, // Presta atencion si quieres poner Category!!!
    deadline:req.body.deadline,

    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname
  });
  console.log(req.file);
  newItem.save( (err) => {
    if (err) {
      console.log("Error creating item");
      console.error(err);
      res.render('items/new', { item: newItem, types: TYPES });
    } else {
      console.log("Creation of item suceeded!");
      console.log(newItem);
      res.redirect(`/items/${newItem.id}`);
    }
  });
});


router.get('/:id', (req, res, next) => {
  Item.findById(req.params.id, (err, item) => {
    if (err){ return next(err); }

    item.populate('_creator', (err, item) => {
      if (err){ return next(err); }
      return res.render('items/show', { item });
    });
  });
});

router.get('/:id/edit', [ensureLoggedIn('/login'), authorizeItem], (req, res, next) => {
  Item.findById(req.params.id, (err, item) => {
    if (err)       { return next(err) }
    if (!item) { return next(new Error("404")) }
    return res.render('items/edit', { item, types: TYPES })
  });
});

router.put('/:id', [ensureLoggedIn('/login'),upload.single('photo'), authorizeItem], (req, res, next) => {
  const updates = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    deadline: req.body.deadline
  };
  Item.findByIdAndUpdate(req.params.id, updates, (err, item) => {
    if (err)       { return res.render('items/edit', { item, errors: item.errors }); }
    if (!item) { return next(new Error("404")); }
    return res.redirect(`/items/${item._id}`);
  });
});

router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Item.findByIdAndRemove(id, (err, product) => {
    if (err){ return next(err); }
    return res.redirect('/');
  });

});

module.exports = router;
