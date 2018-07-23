// db/db_mgr.js
const logger = require('../lib/log/logger');
const DBLIB = require('../lib/db/dblib');

const DBMgr = {
    myDB: null,
    myMemDB: null,
};

/**
 * @param {*} config DB Connection config
 */
DBMgr.connectDB = function(config) {
    this.myDB = new DBLIB('MYSQL', 'MYSQL', config.MySQL);
    this.myMemDB = new DBLIB('MEMDB', 'MYSQL', config.MySQL_RAMDISK);
    if (this.myDB.connect() && this.myMemDB.connect()) {
        logger.trace(this.myDB.toString());
        logger.trace(this.myMemDB.toString());
        // const conn = this.myDB.getConn;
        // conn.query('select * from element_tbl', function(err, rows, field) {
        //     if (err) {
        //         logger.trace(JSON.stringify(err));
        //     } else {
        //         console.log(rows);
        //     }
        // });
    } else {
        process.exit(1);
    }
};

module.exports = DBMgr;
