const mongoose = require('mongoose');

const {Schema} = require('mongoose');

const currentDataSchema = new Schema({
    coin_id: {
        type: String,
        required: true
    },
    name: {type:String, required: true},
    symbol: {type:String, required: true},
    price_usd: {type:Number, required: true},
    market_cap: {type:Number, required: true},
    change_24h: {type:Number, required: true},
    timestamps: {type: Date, default: Date.now},
}, {versionKey: false});

currentDataSchema.index({coin_id: 1}, {unique: true});

module.exports = mongoose.model('CurrentDataModel', currentDataSchema);