const mongoose = require('mongoose');

const {Schema} = mongoose;

const historyDataSchema = new Schema({
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

historyDataSchema.index({coin_id: 1, timestamps: 1});

module.exports = mongoose.model('HistoryDataModel', historyDataSchema);