const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
  email      : {type:String, required:true},
  username   : {type:String, required:true},
  password   : {type:String, required:true},
  imgUrl     : { type: String, default: "https://www.ideas4all.com/accounts/brasaas/images/layout/100x100ximg-default-user2.gif,q1492680179.pagespeed.ic.pRxW64NyzY.png" }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
