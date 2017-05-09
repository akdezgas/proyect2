const express                 = require('express');
const moment                  = require('moment');
const User               = require('../models/User');
const Cupon                  = require('../models/Cupon');
const Item                   = require('../models/Item');
const authorizeItem = require('../middleware/item-authorization');
const router                  = express.Router();
const ObjectId                = require('mongoose').Types.ObjectId;


router.get('/items/:id/cupons/new', authorizeItem, (req, res, next) => {
  Item.findById(req.params.id, (err, item) => {
    res.render('cupons/new', { item })
  });
});

router.post('/items/:id/cupons', authorizeItem, (req, res, next) => {
  Item.findById(req.params.id, (err, item) => {
    if (err || !item) { return next(new Error("404")); }

    const cupon = new Cupon({
      title      : req.body.title,
      description: req.body.description,
      amount     : req.body.amount,
      delivery   : req.body.delivery,
      _item  : item._id
    });

    cupon.save( (err) => {
      if (err){
        return res.render('cupons/new', { errors: cupon.errors });
      }

      item.cupons.push(cupon._id);
      item.save( (err) => {
        if (err) {
          return next(err);
        } else {
          return res.redirect(`/items/${item._id}`);
        }
      });
    });
  });
});

module.exports = router;
