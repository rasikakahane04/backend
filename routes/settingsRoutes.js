const express = require('express');
const Settings = require('../models/Settings');
const router = express.Router();

// Get User Settings
router.get('/settings/:userId', async (req, res) => {
    try {
        const settings = await Settings.findOne({ userId: req.params.userId });
        if (!settings) return res.status(404).json({ message: 'Settings not found' });
        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update User Settings
router.put('/settings/:userId', async (req, res) => {
    try {
        const updatedSettings = await Settings.findOneAndUpdate(
            { userId: req.params.userId },
            req.body,
            { new: true, upsert: true }
        );
        res.json(updatedSettings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
