// routers/api/roadm/router.js
const express = require('express');
const router = express.Router();

// provision
router.use('/slotstatedata', require('./provision/router'));

module.exports = router;
