const express = require('express');
const router = express.Router();
const HistoryDataModel = require('../models/historyDataModel');

// GET /api/history/:coinId
router.get('/:coinId', async (req, res) => {
    try {
        const { coinId } = req.params;
        const history = await HistoryDataModel
            .find({ coin_id: coinId })
            .sort({ createdAt: -1 });

        if (!history.length) {
            return res.status(404).json({ error: `No history found for ${coinId}` });
        }

        res.json(history);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch history data',
            details: error.message
        });
    }
});

module.exports = router;
