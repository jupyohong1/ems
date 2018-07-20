// index.js
const logger = require('./lib/log/logger');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const CONFIG = require('./cfg/cfg');
const socketMgr = require('./sock/sock_mgr');

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '\\static');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('static'));

// Routing
app.use('/api', require('./routers/api/router'));
app.use('/test', require('./routers/test'));
app.use('/report', require('./routers/report'));

// WebServer
const http = require('http').Server(app);
socketMgr.createWebSocket(http);
http.listen(CONFIG.Web.PORT, () => {
    logger.info(`listening on WebPort: ${CONFIG.Web.PORT}`);
});

// TL1 Adapter Connect
socketMgr.createEMSSocket(
    CONFIG.TL1Adapter.IP,
    CONFIG.TL1Adapter.CMD_PORT,
    CONFIG.TL1Adapter.REP_PORT
);

socketMgr.repProc();
socketMgr.reqProc();
