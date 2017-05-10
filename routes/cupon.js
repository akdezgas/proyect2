const express                 = require('express');
const moment                  = require('moment');
const User               = require('../models/User');
const Cupon                  = require('../models/Cupon');
const Item                   = require('../models/Item');
const authorizeItem = require('../middleware/item-authorization');
const router                  = express.Router();
const ObjectId                = require('mongoose').Types.ObjectId;


router.get('/items/:id/cupons/add', (req, res, next) => {
  Item.findById(req.params.id, (err, item) => {
    res.render('cupons/add', { item })
  });
});

router.post('/items/:id/cupons',  (req, res, next) => {
  Item.findById(req.params.id, (err, item) => {
    if (err || !item) { return next(new Error("404")); }
    const cupon = new Cupon({
      quantity      : req.body.quantity,
      bidders : req.user._id,
      product  : item._id
    });



    cupon.save( (err) => {
      if (err){
        console.log(err);
        return res.render('cupons/add', { errors: cupon.errors });
      }

      User.findOneAndUpdate({_id: req.user._id}, { $inc : {cupons: parseInt(-req.body.quantity)}}, ()=>{
        console.log('done update user');
      })
      Item.findOneAndUpdate({_id: item._id}, { $inc : {goal: parseInt(req.body.quantity)}}, ()=>{
        console.log('done update item');
      })

//Operaciones para restar al user, y sumar item de cupon
User.find({_id:req.user._id}, (err, user)=> {
  console.log(user);
});
      //Comprobar si item tiene el max de cupon

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
