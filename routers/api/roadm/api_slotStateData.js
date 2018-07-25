// routers/api/rowadm/api_slotStateData.js
const logger = require('../../../lib/log/logger');
const express = require('express');
const router = express.Router();

const slotStateData = require('../../../lib/roadm/db/slot_state_data_tbl');

// /api/roadm/slotstatedata
router.get('/', async function(req, res) {
    logger.trace('query: ' + JSON.stringify(req.query));

    await slotStateData.getData(req.query)
    .then(function(obj) {
        res.json(obj);
    }, function(obj) {
        res.json(obj);
    });
});


module.exports = router;
