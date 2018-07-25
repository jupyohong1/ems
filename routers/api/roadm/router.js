// routers/api/roadm/router.js
const express = require('express');
const router = express.Router();

// API
router.use('/element', require('./api_element'));
router.use('/slotstatedata', require('./api_slotStateData'));

// HTML


module.exports = router;
