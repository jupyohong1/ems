// db/db_mgr.js
const logger = require('../lib/log/logger');
const mysql = require('mysql');

const DBMgr = {
    mysql: {
        myDB: null,
        myMemDB: null,
    },
};

/**
 * @param {*} config DB Connection config
 */
DBMgr.connectMySQL = function(config) {
    const myDBcfg = config.MySQL;
    const myMemDBCfg = config.MySQL_RAMDISK;

    DBMgr.mysql.myDB = mysql.createPool({
        connectionLimit: (myDBcfg.MAX_CONN_COUNT == undefined) ?
                         10 : myDBcfg.MAX_CONN_COUNT,
        host: myDBcfg.IP,
        port: myDBcfg.PORT,
        user: myDBcfg.USER,
        password: myDBcfg.PASSWORD,
        database: myDBcfg.DATABASE,
    });
    DBMgr.mysql.myMemDB = mysql.createPool({
        connectionLimit: (myMemDBCfg.MAX_CONN_COUNT == undefined) ?
                         10 : myDBcfg.MAX_CONN_COUNT,
        host: myMemDBCfg.IP,
        port: myMemDBCfg.PORT,
        user: myMemDBCfg.USER,
        password: myMemDBCfg.PASSWORD,
        database: myMemDBCfg.DATABASE,
    });
};

module.exports = DBMgr;
