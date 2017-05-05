const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const TYPES    = require('./campaign-types');
const moment = require('moment');

const CampaignSchema = new Schema({
  title         : { type: String, required: true },
  description   : { type: String, required: true },
  category      : { type: String, enum: TYPES, required: true },
  _creator      : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  goal          : { type: Number, required: true },
  backerCount   : { type: Number, default: 0 },
  totalPledged  : { type: Number, default: 0 },
  deadline      : { type: Date, required: true },
  imgUrl     : { type: String, default: "http://img1.rnkr-static.com/user_node_img/75/1498358/C250/maggie-simpson-film-characters-photo-u1.jpg" }
});
CampaignSchema.virtual('timeRemaining').get(function () {
  let remaining = moment(this.deadline).fromNow(true).split(' ');
  let [days, unit] = remaining;
  return { days, unit };
});

CampaignSchema.virtual('inputFormattedDate').get(function(){
  return moment(this.deadline).format('YYYY-MM-DD');
});


module.exports = mongoose.model('Campaign', CampaignSchema);
