// lib/roadm/roadm_common.js
const ROADM_COMMON = {};

ROADM_COMMON.SYSID = {
    MPUTYPE_WCU: 0x01,
    MPUTYPE_CCU: 0x02,
    MPUTYPE_RCU: 0x03,
    MPUTYPE_8100_WC: 0x07,
    MPUTYPE_8100_RS: 0x08,
    MPUTYPE_6300_WC: 0x09,
    MPUTYPE_6300_RC: 0x0A,
};

ROADM_COMMON.PIDTYPE = {
    UID: 1,
    POT: 2,
    AU4_64C: 3,
    AU4_16C: 4,
    AU4_4C: 5,
    AU4: 6,
    AU3: 7,
    VCG: 8,
    CLK: 9,
};

ROADM_COMMON.PIDPART = {
    NONE: 0,
    LINE_TX: 1,
    LINE_RX: 2,
    ADD_IN: 3,
    ADD_OUT: 4,
    DROP_IN: 5,
    DROP_OUT: 6,
    LASER: 7,
    DCFM_IN: 8,
    DCFM_OUT: 9,
    OSC: 10,
    ADD_EDFA: 11,
    DROP_EDFA: 12,
    LINE: 13,
    CLIENT: 14,
    AMP: 15,
    POT_A: 16,
    POT_B: 17,
    LANE_TX: 18,
    LANE_RX: 19,
    LANE: 20,
    LINE_ADD: 21,
    LINE_DROP: 22,
    SLICE: 23,
};

ROADM_COMMON.opmode2str = function(byte) {
    if (byte == 0) {
        return 'AGC';
    } else if (byte == 1) {
        return 'ACC';
    } else if (byte == 2) {
        return 'ALS';
    } else if (byte == 3) {
        return 'APS';
    } else {
        return `unknown(${byte})`;
    }
};

ROADM_COMMON.msa2str = function(byte) {
    if (byte == 0) {
        return 'OADM';
    } else if (byte == 1) {
        return 'DCF';
    } else {
        return `unknown(${byte})`;
    }
};

ROADM_COMMON.apcmode2str = function(byte) {
    if (byte == 0) {
        return 'MAN';
    } else if (byte ==1) {
        return 'AUTO';
    } else {
        return `unknown(${byte})`;
    }
};

ROADM_COMMON.alsmode2str = function(byte) {
    if (byte == 0) {
        return 'MLS';
    } else if (byte == 1) {
        return 'ALS';
    } else {
        return `unknwon(${byte})`;
    }
};

/**
 * parse ROADM_STime object
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @return {object} ROADM_STIME object
 */
ROADM_COMMON.parseTimeObject = function(buf, idx) {
    let time = {
        ye: buf.readUInt16BE(idx),
        mo: buf[idx+2],
        da: buf[idx+3],
        ho: buf[idx+4],
        mi: buf[idx+5],
        se: buf[idx+6],
    };
    return time;
};

/**
 * parse ROADM_PID object
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @return {object} ROADM_PID object
 */
ROADM_COMMON.parsePIDObject = function(buf, idx) {
    let pid = {
        typ: buf[idx],
        sys: buf[idx+1],
        bid: buf[idx+2],
        uid: buf[idx+3],
        npo: buf[idx+4],
        par: buf[idx+5],
        aug: buf[idx+6],
        au3: buf[idx+7],
    };
    return pid;
};

/**
 * parse ROADM_PID array
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @param {number} count array count
 * @return {array} ROADM_PID array
 */
ROADM_COMMON.parsePIDArray = function(buf, idx, count) {
    const offset = 8;
    let array = [];

    for (let i = 0; i < count; i++) {
        array.push(ROADM_COMMON.parsePIDObject(buf, idx + i*offset));
    }

    return array;
};

module.exports = ROADM_COMMON;
