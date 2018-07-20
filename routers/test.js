// routers/test.js
const express = require('express');
const router = express.Router();
const CMDLIST_FILE = __dirname + '\\..\\cfg\\cmdlist.json';
const cmdList = JSON.parse(
    require('fs').readFileSync(CMDLIST_FILE, 'utf8')
);

// /test
router.get('/', function(req, res) {
  res.render('test.html', {cmdList: cmdList});
});

module.exports = router;
