// lib/sock/web.js
const logger = require('../log/logger');
const socketIO = require('socket.io');

/**
 * WebSocket Class
 */
class WebSock {
    /**
     * WebSocket Class constructor
     * @param {*} http http server
     * @param {function} event webSocket event
     */
    constructor(http, event) {
        this.name = 'web';
        this.io = socketIO(http);
        this.recvArray = [];
        this.connCount = 0;
        this.sockEvent = event;
        this.start(this);
    }
    /**
     * @return {number} connCount;
     */
    get getConnCount() {
        return this.connCount;
    }

    /**
     * @return {number} recv count
     */
    get getRecvCount() {
        return this.recvArray.length;
    }

    /**
     * @param {function} event websocket event
     */
    set setSockEvent(event) {
        this.sockEvent = event;
    }

    /**
     * Add connection count
     */
    addConnCount() {
        this.connCount += 1;
        logger.info(this.toString());
    }

    /**
     * Sub connection count
     */
    subConnCount() {
        this.connCount -= 1;
        logger.info(this.toString());
    }

    /**
     * Start WebSocket
     * @param {WebSock} param WebSocket Class
     */
    start(param) {
        this.io.on('connection', function(ws) {
            param.addConnCount();
            param.sockEvent(ws, param);

            ws.on('disconnect', function() {
                param.subConnCount();
            });
        });
    }

    /**
     * WebSocket Event function
     * 반드시 재정의하여 사용할 것
     * ex) websock.setEvent = function(ws) {console.log(ws)};
     * @param {*} ws websocket
     * @param {WebSocket} param WebSocket class
     */
    sockEvent(ws, param) {
        console.log('hello?');
    }

    /**
     * push data to Array
     * @param {*} data recvData
     */
    setData(data) {
        this.recvArray.push(data);
    }

    /**
     * Get data from Array
     * @return {*} recvData
     */
    getData() {
        // console.log(this.recvArray);
        return this.recvArray.shift();
    }
    /**
     * 데이터 전송
     * @param {string} event event name
     * @param {string} msg send message
     */
    send(event, msg) {
        logger.trace(`sock[${this.name}], send '${event}'`);
        this.io.emit(event, msg);
    }
    /**
     * 데이터 전송
     * @param {*} id socket id
     * @param {*} event event name
     * @param {*} msg send message
     */
    sendto(id, event, msg) {
        logger.trace(`sock[${this.name}], send '${event}' to ${id}`);
        this.io.to(id).emit(event, msg);
    }

    /**
     * @return {string} string by WebSock
     */
    toString() {
        return `\
sock[${this.name}], connCount[${this.getConnCount}]`;
    }
};

module.exports = WebSock;

// const express = require('express');
// const app = express();
// // API
// app.use('/test', require('../../routers/test.js'));

// // server
// const http = require('http').Server(app);
// const port = 3000;
// const webSock = new WebSock(http);
// http.listen(port, function() {
//     console.log(`listening on Web port: ${port}`);
// });

