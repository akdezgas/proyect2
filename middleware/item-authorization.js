/* jshint esversion:6 */
const Item = require('../models/Item.js');

function authorizeItem(req, res, next){
  Item.findById(req.params.id, (err, item) => {
    // If there's an error, forward it
    if (err)      { return next(err); }
    // If there is no item, return a 404
    if (!item){ return next(new Error('404')); }
    // If the item belongs to the user, next()
    if (item._creator.equals(req.user._id)){
      console.log("User is the owner of the item, authorize!");
      return next();
    } else {
    // Otherwise, redirect
      console.error("User is NOT THE OWNER");
      return res.redirect(`/items/${item._id}`);
    }
  });
}

module.exports = authorizeItem;
