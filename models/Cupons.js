const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CuponsSchema = new Schema({
  quantity      : {type:Number, default: 10},
  imgUrl     : { type: String, default: "http://www.clker.com/cliparts/d/8/s/u/4/b/coin-1-th.png" }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
