// routers/api/tl1/api_common.js
const logger = require('../../../lib/log/logger');
const TL1_API = require('../../../tl1/tl1_api');
const util = require('../../../lib/util/util');
const sockMgr = require('../../../sock/sock_mgr');

const API_COMMON = {};

API_COMMON.cmdProc = async function(cmd, tid, aid, param) {
  const cmdSock = sockMgr.cmdSock;
  if (cmdSock.getIsConnect) {
    try {
      let sendTL1Data = TL1_API.GetSendMsg(cmd, tid, aid, param);
      if (cmdSock.send(sendTL1Data.toString())) {
        let recvData = await cmdSock.getRecvDataFunc(cmdSock, 0);
        if (recvData == undefined) {
          logger.info(`Socket RecvData is undefined, retry!`);
          recvData = await cmdSock.getRecvDataFunc(cmdSock, 0);
        }

        if (recvData.result) {
          const resTL1Data = TL1_API.parseData2Json(cmd, recvData.msg);
          logger.info(`RecvTL1Data.ctag[${recvData.msg.ctag}]`);
          return resTL1Data;
        } else {
          return util.successFalse(recvData.msg);
        }
      } else {
        const msg = `TL1 send fail`;
        logger.warn(msg);
        return util.successFalse(msg);
      }
    } catch (exception) {
      logger.warn(JSON.stringify(exception));
      return util.successFalse(exception.toString());
    }
  } else {
    const msg = cmdSock.getConnectInfo();
    logger.trace(msg);
    return util.successFalse(msg);
  }
};

module.exports = API_COMMON;
