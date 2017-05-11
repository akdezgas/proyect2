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
    console.log(remainderCuponsItem);
    if((remainderCuponsUser > 0) && (remainderCuponsItem > 0) ){
      req.user.cupons = remainderCuponsUser;
      item.backerCount = remainderCuponsItem;
      req.user.save((err,user) => {
        item.save((err,item) =>{
          res.redirect('/items/'+item._id);
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
  Cupon.find({product: req.params.id}, (err, item) => {
    let whoWinner = math.Random();
    let x = Math.floor((Math.random() * 10) + 1);


    //res.render('cupons/winner', { item })
    //REalizar peticion y buscar todos los cupones que tienen esa id

  });


});

module.exports = router;

/*

router.get('/buy', (req, res, next) => {

      res.render('cupons/buy', { item })

  });
///items/buy
router.post('/buy',  (req, res, next) => {
    return User.findById(req.params.id, (err, item) => {
      let requestedQuantity = parseInt(req.body.quantity);
      let currentUserQuantity= user.cupons;

      let remainderCuponsUser = currentUserQuantity + requestedQuantity;

        user.cupons = remainderCuponsUser;

        user.save((err,user) => {
            res.redirect('/');
        });

    });
  });

*/
