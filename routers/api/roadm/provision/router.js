// routers/api/rowadm/provision/router.js
const express = require('express');
const router = express.Router();

const slotStateData = require('../../../../lib/roadm/provision/slotstatedata');

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
    .then(function(obj) {
        res.json(obj);
    }, function(obj) {
        res.json(obj);
    });
});


module.exports = router;
