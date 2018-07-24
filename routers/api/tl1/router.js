// routers/api/tl1/router.js
const express = require('express');
const router = express.Router();

// TL1 - admin commands
// TL1 - alarm commands
// TL1 - cxc commands
// TL1 - nms commands
router.use('/net', require('./nms/api_net'));
// TL1 - opc commands
// TL1 - operation commands
// TL1 - pm commands
// TL1 - provision commands
router.use('/sys', require('./provision/api_sys'));
// TL1 - switch commands
// TL1 - test commands

module.exports = router;
