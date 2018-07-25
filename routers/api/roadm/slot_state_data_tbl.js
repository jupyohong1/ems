// routers/api/rowadm/slot_state_data_tbl.js
const express = require('express');
const router = express.Router();

const slotStateData = require('../../../lib/roadm/db/slot_state_data_tbl');
// const element = require('../../../../lib/roadm/db/element_tbl');

// /api/roadm/slotstatedata
router.get('/', async function(req, res) {
    const param = {
        ne_type: 260,
        element_id: 1531966075,
        seq_no: 88,
        shelf_id: 0,
        // slot_id: 22,
    };
    // const param = {
    //     elementId: null,
    //     elementSeq: null,
    //     shelfId: null,
    //     slotId: null,
    // };

    await slotStateData.getSlotStateData(param)
    // await element.getData(param)
    .then(function(obj) {
        res.json(obj);
    }, function(obj) {
        res.json(obj);
    });
});


module.exports = router;
