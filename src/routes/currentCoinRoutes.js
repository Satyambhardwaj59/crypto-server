const express = require('express');
const router = express.Router();
const CurrentDataModel = require('../models/currentDataModel');

// GET /api/coins — returns data from DB only
router.get('/', async (req, res) => {
    try {
        // ✅ Only read from DB
        const coins = await CurrentDataModel.find({});
        
        if (!coins.length) {
            return res.status(404).json({ error: "No data available yet" });
        }

        const lastUpdatedDoc = await CurrentDataModel.findOne().sort({ updatedAt: -1 });

        res.json({
            lastUpdated: lastUpdatedDoc.updatedAt,
            data: coins
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch coin data', details: error.message });
    }
});

module.exports = router;
