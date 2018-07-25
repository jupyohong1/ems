// routers/roadm/router.js
const logger = require('../../lib/log/logger');
const express = require('express');
const router = express.Router();

const ELEMENT_TBL = require('../../lib/roadm/db/element_tbl');
const SLOTSTATEDATA_TBL = require('../../lib/roadm/db/slot_state_data_tbl');

// /roadm
router.get('/', async function(req, res) {
    logger.trace('query: ' + JSON.stringify(req.query));

    await ELEMENT_TBL.getData(req.query)
        .then(function(elementList) {
            res.render('roadm.html', {
                elementList: elementList,
                slotStateDataList: [],
            });
        }, function(obj) {
            logger.error(obj);
            res.render('roadm.html', {
                elementList: [],
                slotStateDataList: [],
            });
        });
});

// /roadm/slotstate
router.get('/slotstate', async function(req, res) {
    logger.trace('query: ' + JSON.stringify(req.query));

    await ELEMENT_TBL.getData({})
        .then(async function(elementList) {
            await SLOTSTATEDATA_TBL.getData(req.query)
                .then(function(slotStateDataList) {
                    res.render('roadm.html', {
                        elementList: elementList,
                        slotStateDataList: slotStateDataList,
                    });
                }, function(obj) {
                    logger.error(obj);
                    res.render('roadm.html', {
                        elementList: elementList,
                        slotStateDataList: [],
                    });
                });
        }, function(obj) {
            logger.error(obj);
            res.render('roadm.html', {
                elementList: [],
                slotStateDataList: [],
            });
        });
});

module.exports = router;
