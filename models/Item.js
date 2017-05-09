const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const TYPES    = require('./item-types');
const moment = require('moment');

const ItemSchema = new Schema({
  title         : { type: String, required: true },
  description   : { type: String, required: true },
  category      : { type: String, enum: TYPES, required: true },
  _creator      : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  goal          : { type: Number, required: true },
  backerCount   : { type: Number, default: 0 },
  totalPledged  : { type: Number, default: 0 },
  deadline      : { type: Date, required: true },
  imgUrl     : { type: String, default: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRwfjhKyiONTjnx2t5tbKVrIqEpN22zRRN6IluVir-1dysSBcqP" }
});
ItemSchema.virtual('timeRemaining').get(function () {
  let remaining = moment(this.deadline).fromNow(true).split(' ');
  let [days, unit] = remaining;
  return { days, unit };
});

ItemSchema.virtual('inputFormattedDate').get(function(){
  return moment(this.deadline).format('YYYY-MM-DD');
});


module.exports = mongoose.model('Item', ItemSchema);
