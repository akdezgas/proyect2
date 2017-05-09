var express = require('express');
var router = express.Router();
const Item = require('../models/Item');


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);

    Item
      .find({})
      .populate('_creator')
      .exec( (err, items) => {
          res.render('index', { items});
      });
});

module.exports = router;
