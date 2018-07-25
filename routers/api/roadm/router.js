// routers/api/roadm/router.js
const express = require('express');
const router = express.Router();

// provision
router.use('/slotstatedata', require('./slot_state_data_tbl'));

module.exports = router;
