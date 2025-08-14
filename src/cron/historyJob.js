// const cron = require('node-cron');
// const { fetchCoinData } = require('../fetchData/coinGeckoData');
// const CurrentDataModel = require('../models/currentDataModel');
// const HistoryDataModel = require('../models/historyDataModel');

// cron/historyJob.js
const cron = require('node-cron');
const CurrentDataModel = require('../models/currentDataModel');
const { fetchCoinData } = require('../fetchData/coinGeckoData');

cron.schedule('0 * * * *', async () => { // every hour
    try {
        const coins = await fetchCoinData();

        for (const coin of coins) {
            await CurrentDataModel.updateOne(
                { coin_id: coin.coin_id },
                { $set: coin },
                { upsert: true }
            );
        }

        console.log("✅ Coin data updated at", new Date());
    } catch (error) {
        console.error("❌ Failed to update coin data:", error.message);
    }
});

