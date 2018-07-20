// routers/reports.js
const express = require('express');
const router = express.Router();
const fs = require('fs');

const htmlPath = './static/report.html';

// /report
router.get('/', function(req, res) {
  fs.readFile(htmlPath, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    }
  });
});


module.exports = router;
