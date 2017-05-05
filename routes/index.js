var express = require('express');
var router = express.Router();
const Campaign = require('../models/Campaign');


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);

    Campaign
      .find({})
      .populate('_creator')
      .exec( (err, campaigns) => {
          res.render('index', { campaigns});
      });
});

module.exports = router;
