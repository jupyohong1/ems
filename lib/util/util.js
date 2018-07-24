// util.js
const util = {};

util.HIWORD = function(l) {
  return ((l>>16) & 0xffff);
};

util.LOWORD = function(l) {
  return (l & 0xffff);
};

util.HIBYTE = function(w) {
  return ((w >> 8) & 0xff);
};

util.LOBYTE = function(w) {
  return (w & 0xff);
};


util.successTrue = function(data) {
  return {
    success: true,
    message: null,
    data: data,
  };
};

util.successFalse = function(message) {
  if (!message) message = 'data not found';
  return {
    success: false,
    message: message,
    data: null,
  };
};

let ctag = 0;
util.getCtags = function() {
  let retCtag = ctag;
  ctag = (ctag + 1) % Number.MAX_SAFE_INTEGER;
  return retCtag;
};

module.exports = util;
