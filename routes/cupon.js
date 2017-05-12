const express                 = require('express');
const moment                  = require('moment');
const User               = require('../models/User');
const Cupon                  = require('../models/Cupon');
const Item                   = require('../models/Item');
const authorizeItem = require('../middleware/item-authorization');
const router                  = express.Router();
const ObjectId                = require('mongoose').Types.ObjectId;

router.get('/:id/add', (req, res, next) => {
  Item.findById(req.params.id, (err, item) => {
    res.render('cupons/add', { item })
  });
});

router.post('/:id/add',  (req, res, next) => {
  return Item.findById(req.params.id, (err, item) => {
    let requestedQuantity = parseInt(req.body.quantity);
    let currentQuantity = req.user.cupons;
    let currentItemQuantity= item.backerCount;

    let remainderCuponsUser = currentQuantity - requestedQuantity;
    let remainderCuponsItem = currentItemQuantity - requestedQuantity;
    console.log(remainderCuponsUser);
    if((remainderCuponsUser > 0) && (remainderCuponsItem > 0) ){
      req.user.cupons = remainderCuponsUser;
      item.backerCount = remainderCuponsItem;
      console.log(remainderCuponsItem);
      req.user.save((err,user) => {
        var cupon = new Cupon({
            bidder: req.user._id,
            product: item._id,
            quantity: requestedQuantity
        })
        cupon.save((err,cupon) =>{
          item.save((err,item) =>{
            res.redirect('/items/'+item._id);

          })
        })
        console.log("User remaind cupons: " + remainderCuponsUser);
      });
    }else{
      console.log("USER DOES NOT HAVE ENHOUGH CUPONS");
      res.render('cupons/add', { item,errors: err });
    }
  });

});
router.get('/:id/winner', (req, res, next) => {
  Cupon.find({product: req.params.id})
  .populate('bidder').then( (cupons) => {
    console.log(cupons);
    if (cupons.length <0 ){
      console.log("Theres is no winner yet");
    }
    let x = Math.floor((Math.random() * cupons.length));
    console.log(x);
    const winner = cupons[x];
    res.render('cupons/winner', { winner })
  });
});

module.exports = router;
