const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CuponSchema = new Schema({
  quantity : {type:Number},
  bidder   : { type: Schema.Types.ObjectId,  ref: 'User' },
  product  : {type : Schema.Types.ObjectId, ref: 'Item'},
});


const Cupon = mongoose.model('Cupon', CuponSchema);

module.exports = Cupon;
