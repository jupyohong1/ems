// lib/db/dblib.js
const logger = require('../log/logger');
const mysql = require('mysql');

/**
 * DBLIB
 */
class DBLIB {
    /**
     * @param {string} name class name
     * @param {string} type DB type(ex. 'mysql'..)
     * @param {*} config connection config
     */
    constructor(name, type, config) {
        this.name = name;
        this.type = type.toLowerCase();
        this.config = config;
        this.conn = null;
    }

    /**
     * @return {string} return class name
     */
    get getName() {
        return this.name;
    }

    /**
     * @return {string} return DB Type
     */
    get getType() {
        return this.type;
    }

    /**
     * @return {*} return connection config
     */
    get getConfig() {
        return this.config;
    }

    /**
     * @return {*} return connection object
     */
    get getConn() {
        return this.conn;
    }

    /**
     * @return {string} return connection state
     */
    get getConnState() {
        if (this.conn == null) {
            return 'disconnected';
        } else {
            return this.conn.state;
        }
    }

    /**
     * @return {string} return string
     */
    toString() {
        let obj = {
            name: this.name,
            type: this.type,
            config: this.config,
            status: this.getConnState,
        };

        return JSON.stringify(obj);
    }

    /**
     * connect DB
     * @return {boolean} return connect result
     */
    connect() {
        let res = false;
        switch (this.type) {
            case 'mysql':
                try {
                    this.conn = mysql.createConnection({
                        host: this.config.IP,
                        port: this.config.PORT,
                        user: this.config.USER,
                        password: this.config.PASSWORD,
                        database: this.config.DATABASE,
                    });
                    this.conn.connect();
                    res = true;
                } catch (exception) {
                    logger.error(JSON.stringify(exception));
                }
                break;
            default:
                logger.error(`unknown DB type, ${this.type}`);
                break;
        }

        return res;
    }

    /**
     * disconnect DB
     */
    disconnect() {
        switch (this.type) {
            case 'mysql':
                try {
                    this.conn.end();
                } catch (exception) {
                    logger.error(JSON.stringify(exception));
                }
                break;
            default:
                logger.error(`unknown DB type, ${this.type}`);
                break;
        }
    }
}


module.exports = DBLIB;
