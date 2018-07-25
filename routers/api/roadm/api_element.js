// routers/api/rowadm/api_element.js
const logger = require('../../../lib/log/logger');
const express = require('express');
const router = express.Router();

const element = require('../../../lib/roadm/db/element_tbl');

// /api/roadm/element
router.get('/', async function(req, res) {
    logger.trace('query: ' + JSON.stringify(req.query));

    await element.getData(req.query)
    .then(function(obj) {
        res.json(obj);
    }, function(obj) {
        res.json(obj);
    });
});


module.exports = router;
