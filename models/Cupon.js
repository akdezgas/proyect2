const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CuponSchema = new Schema({
  quantity : {type:Number},
  bidders    : [ { type: Schema.Types.ObjectId,  ref: 'User' } ],
  product    : {type : Schema.Types.ObjectId, ref: 'Item'},
});


const Cupon = mongoose.model('Cupon', CuponSchema);

module.exports = Cupon;

/*
title      : { type: String, required: true },
description: { type: String, required: true },
amount     : { type: Number, required: true, min: 0 },
delivery   : { type: Date, required: true },
_campaign  : { type: Schema.Types.ObjectId, ref: 'Campaign' },

*/
