/* jshint esversion:6 */
const Campaign = require('../models/Campaign.js');

function authorizeCampaign(req, res, next){
  Campaign.findById(req.params.id, (err, campaign) => {
    // If there's an error, forward it
    if (err)      { return next(err); }
    // If there is no campaign, return a 404
    if (!campaign){ return next(new Error('404')); }
    // If the campaign belongs to the user, next()
    if (campaign._creator.equals(req.user._id)){
      console.log("User is the owner of the campaign, authorize!");
      return next();
    } else {
    // Otherwise, redirect
      console.error("User is NOT THE OWNER");
      return res.redirect(`/campaigns/${campaign._id}`);
    }
  });
}

module.exports = authorizeCampaign;
