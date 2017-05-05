const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
  email      : {type:String, required:true},
  username   : {type:String, required:true},
  password   : {type:String, required:true},
  description: String,
  imgUrl     : { type: String, default: "https://cdn.meme.am/cache/images/folder565/250x250/11490565/homer-simpson-donut.jpg" }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
