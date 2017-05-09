/* jshint esversion:6 */
const express  = require('express');
const Item = require('../models/Item');
const TYPES    = require('../models/item-types');
const router   = express.Router();
const { ensureLoggedIn }  = require('connect-ensure-login');
const authorizeItem = require('../middleware/item-authorization');

router.get('/new', ensureLoggedIn('/login'), (req, res) => {
  res.render('items/new', { types: TYPES});
});

router.post('/', ensureLoggedIn('/login'), (req, res, next) => {

  const {title, goal,description, category, deadline} = req.body;
  const newItem = new Item({
    title,
    goal,
    description,
    category,
    deadline,
    // We're assuming a user is logged in here
    // If they aren't, this will throw an error
    _creator: req.user._id
  });

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

router.put('/:id', [ensureLoggedIn('/login'), authorizeItem], (req, res, next) => {
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


module.exports = router;
