// lib/roadm/roadm_v4_common.js
const ROADM_COMMON = require('./roadm_common');
const ROADM_V4 = {};

ROADM_V4.WCS = {};
ROADM_V4.RCS = {};
ROADM_V4.CCS = {};

ROADM_V4.WCS.UID = {
    WCS_S_01: 0,
    WCS_S_02: 1,
    WCS_S_03: 2,
    WCS_S_04: 3,
    WCS_S_05: 4,
    WCS_S_06: 5,
    WCS_S_07: 6,
    WCS_S_08: 7,
    WCS_S_09: 8,
    WCS_S_10: 9,
    WCS_S_11: 10,
    WCS_S_12: 11,
    WCS_S_13: 12,
    WCS_S_14: 13,
    WCS_S_15: 14,
    WCS_S_16: 15,
    WCS_S_17: 16,
    WCS_S_18: 17,
    WCS_S_19: 18,
    WCS_S_20: 19,
    WCS_SCU_1: 20,
    WCS_SCU_2: 21,
    WCS_WCU_A: 22,
    WCS_WCU_B: 23,
    WCS_WCU: 24,
};

ROADM_V4.WCS.BID = {
    BLK: 0,
    WCU: 1,
    SCU: 2,
    BLK_W: 3,
    EMP_W: 4,
    BAU: 5,
    PAU: 6,
    PAU_L: 7,
    LAU: 8,
    LIU: 9,
    BAU_F: 10,
    PAU_F: 11,
    RAU_B: 12,
    RAU_F: 13,
    LAU_L: 14,
    BAU_L: 15,
    WADU_D: 16,
    WADU_A: 17,
    WADU_B: 18,
    WADU_C: 19,
    WADU8_A: 20,
    WADU8_B: 21,
    WADU8_C: 22,
    WSU_5: 23,
    WSU_2: 24,
    WSU_9: 25,
    EMP: 26,
    WDU_8: 27,
    WDU_8E: 28,
    WDU_9: 29,
    WDU_9E: 30,
    WDU_40: 31,
    WDU_40E: 32,
    BID_033: 33,
    BID_034: 34,
    BID_035: 35,
    WMU_32: 36,
    WMU_40: 37,
    WMU_40C: 38,
    BID_039: 39,
    BID_040: 40,
    OPU_1: 41,
    OPU_4: 42,
    BID_043: 43,
    DCXU: 44,
    BID_045: 45,
    BAUp: 46,
    BAUp_L: 47,
    PAUp: 48,
    PAUp_L: 49,
    LAUp: 50,
    LAUp_L: 51,
    LAUp_H: 52,
    LAUp_LH: 53,
    LIUp: 54,
    BID_055: 55,
    BID_056: 56,
    BID_057: 57,
    WSUp_2: 58,
    WSUp_5: 59,
    WSUp_9: 60,
    BID_061: 61,
    BID_062: 62,
    WADUp_5A: 63,
    WADUp_5B: 64,
    WADUp_5C: 65,
    WADUp_9A: 66,
    WADUp_9B: 67,
    WADUp_9C: 68,
    BID_069: 69,
    BID_070: 70,
    WMDU_40: 71,
    WMDU_40V: 72,
    WMDUe_40: 73,
    WMDUp_40: 74,
    WMDUe_40V: 75,
    WMDUe_9: 76,
    WMDUp_9: 77,
    BID_078: 78,
    BID_079: 79,
    TDCU_A: 80,
    TDCU_B: 81,
    TDCUp_A: 82,
    TDCUp_B: 83,
    BID_084: 84,
    BID_085: 85,
    DCXUp: 86,
    DCXU_2: 87,
    DCXUp_2: 88,
    BID_089: 89,
    BID_090: 90,
    RAUps_B: 91,
    RAUp_F: 92,
    RAUp_BL: 93,
    OPUp_1: 97,
    OPUp_4: 98,
    OSAU_4: 101,
    OSAU_8: 102,
    SIU: 105,
    UNKNOWN: 106,
};

ROADM_V4.RCS.UID = {
    RCS_S_01: 0,
    RCS_S_02: 1,
    RCS_S_03: 2,
    RCS_S_04: 3,
    RCS_S_05: 4,
    RCS_S_06: 5,
    RCS_S_07: 6,
    RCS_S_08: 7,
    RCS_S_09: 8,
    RCS_S_10: 9,
    RCS_SCU_1: 10,
    RCS_SCU_2: 11,
    RCS_RCU_A: 12,
    RCS_RCU_B: 13,
    RCS_RCU: 14,
};

ROADM_V4.RCS.BID = {
    BLK: 0,
    RCU: 1,
    SCU: 2,
    EMP_W: 3,
    RAU_F: 4,
    RAU_B: 5,
    LAU: 6,
    LAU_L: 7,
    LAU_AW: 8,
    LAU_DW: 9,
    DCXU: 10,
    DCXUp: 11,
    OPU_1: 12,
    OPU_4: 13,
    BID_014: 14,
    EMP: 15,
    LAUp: 16,
    LAUp_L: 17,
    LAUp_H: 18,
    LAUp_LH: 19,
    BID_20: 20,
    BID_21: 21,
    TDCU_A: 22,
    TDCU_B: 23,
    TDCUp_A: 24,
    TDCUp_B: 25,
    BID_26: 26,
    BID_27: 27,
    RAUp_B: 28,
    RAUp_F: 29,
    RAUp_BL: 30,
    OPUp_1: 34,
    OPUp_4: 35,
    OSAU_4: 38,
    OSAU_8: 39,
    UNKNOWN: 40,
};

ROADM_V4.CCS.UID = {
    CCS_S_1A: 0,
    CCS_S_1B: 1,
    CCS_S_2A: 2,
    CCS_S_2B: 3,
    CCS_S_3A: 4,
    CCS_S_3B: 5,
    CCS_S_4A: 6,
    CCS_S_4B: 7,
    CCS_S_5A: 8,
    CCS_S_5B: 9,
    CCS_S_6A: 10,
    CCS_S_6B: 11,
    CCS_S_7A: 12,
    CCS_S_7B: 13,
    CCS_S_8A: 14,
    CCS_S_8B: 15,
    CCS_CCU_A: 16,
    CCS_CCU_B: 17,
    CCS_S_1: 18,
    CCS_S_2: 19,
    CCS_S_3: 20,
    CCS_S_4: 21,
    CCS_S_5: 22,
    CCS_S_6: 23,
    CCS_S_7: 24,
    CCS_S_8: 25,
    CCS_CCU: 26,
};

ROADM_V4.CCS.BID = {
    BLK: 0,
    CCU: 1,
    OT64U: 2,
    RG64U: 3,
    SMNU: 4,
    SMGU: 5,
    OT3U: 6,
    DCAU: 7,
    OT16U: 8,
    OM01U: 9,
    GBEU: 10,
    OM23U: 11,
    OT64HU: 12,
    RG2U: 13,
    OPSU: 14,
    OTNU_C: 15,
    OTNU_R: 16,
    OTSU: 17,
    OT2U_1: 18,
    OT2U_2: 19,
    OT4U: 20,
    OM24U: 21,
    OM02U: 22,
    OM12U: 23,
    OM01U_2: 25,
    OT2HU_2: 26,
    CSAU_2A: 27,
    CSAU_2B: 28,
    ESPU_4M: 29,
    ESPU_4S: 30,
    CSPU_2: 31,
    CSPU_4: 32,
    UNKNOWN: 33,
};


/**
 * parse WADU lambda object
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @return {object} lambda object
 */
ROADM_V4.parseWADUProvLambdaObject = function(buf, idx) {
    let lambda = {
        port_assign: buf[idx],
        atten: buf.readUInt16BE(idx+1),
        op_mode: buf[idx+3],
        o_power: buf.readInt16BE(idx+4),
        mode: buf[idx+6],
        max_temp: buf.readInt16BE(idx+7),
        min_temp: buf.readInt16BE(idx+9),
    };
    return lambda;
};

/**
 * parse WADU lambda array
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @param {number} count array count
 * @return {array} lambda array
 */
ROADM_V4.parseWADUProvLambdaArray = function(buf, idx, count) {
    const offset = 11;
    let array = [];

    for (let i = 0; i < count; i++) {
        array.push(ROADM_V4.parseWADUProvLambdaObject(buf, idx + i*offset));
    }

    return array;
};

/**
 * parse WDU lambda object
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @return {object} lambda object
 */
ROADM_V4.parseWDUProvLambdaObject = function(buf, idx) {
    let lambda = {
        port_assign: buf[idx],
        atten: buf.readUInt16BE(idx+1),
    };
    return lambda;
};

/**
 * parse WDU lambda array
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @param {number} count array count
 * @return {array} lambda array
 */
ROADM_V4.parseWDUProvLambdaArray = function(buf, idx, count) {
    const offset = 3;
    let array = [];

    for (let i = 0; i < count; i++) {
        array.push(ROADM_V4.parseWDUProvLambdaObject(buf, idx + i*offset));
    }

    return array;
};

/**
 * parse CCS line port object
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @return {object} line port object
 */
ROADM_V4.parseLinePortObject = function(buf, idx) {
    let line = {
        if_mode: buf[idx],
        lambda: buf[idx+1],
        sw_wss: buf[idx+2],
        sw_revt: buf[idx+3],
        fec_mode: buf[idx+4],
        laser: buf[idx+5],
        ds_value: buf.readInt16BE(idx+6), // 2byte
        pair_slot: ROADM_COMMON.parsePIDObject(buf, idx+8), // 8byte
        edfa_outpwr: buf[idx+16],
        dli: buf[idx+17],
        ber: buf[idx+18],
        efec_mode: buf[idx+19],
        txsd_fec: buf[idx+20],
        rxsd_fec: buf[idx+21],
    };
    return line;
};

/**
 * parse CCS line port array
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @param {number} count array count
 * @return {array} line port array
 */
ROADM_V4.parseLinePortArray = function(buf, idx, count) {
    const offset = 22;
    let array = [];

    for (let i = 0; i < count; i++) {
        array.push(ROADM_V4.parseLinePortObject(buf, idx + (i*offset)));
    }

    return array;
};

/**
 * parse  client port
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @return {object} client port
 */
ROADM_V4.parseClientPortObject = function(buf, idx) {
    let client = {
        if_mode: buf[idx],
        sw_mode: buf[idx + 1],
        llcf: buf[idx + 2],
        auto_nego: buf[idx + 3],
        flow_ctrl: buf[idx + 4],
        laser: buf[idx + 5],
        los_action: buf[idx + 6],
        lof_action: buf[idx + 7],
        aulop_action: buf[idx + 8],
        ber: buf[idx + 9],
        name: buf.slice(idx + 10, idx + 52),
    };

    return client;
};

/**
 * parse client port array
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @param {object} count array count
 * @return {array} client port array
 */
ROADM_V4.parseClientPortArray = function(buf, idx, count) {
    const offset = 53;
    let array = [];

    for (let i = 0; i < count; i++) {
        array.push(ROADM_V4.parseClientPortObject(buf, idx + i*offset));
    }

    return array;
};

/**
 * parse CSAU line port object
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @return {object} CSAU line port object
 */
ROADM_V4.parseCSAULinePortObject = function(buf, idx) {
    let obj = {
        l_lambda: buf[idx],
        l_bst_pwr: buf.readInt16BE(idx+1),
        l_pre_pwr: buf.readInt16BE(idx+3),
    };

    return obj;
};

/**
 * parse CSAU line port array
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @param {number} count array count
 * @return {array} CSAU line port array
 */
ROADM_V4.parseCSAULinePortArray = function(buf, idx, count) {
    const offset = 5;
    let array = [];

    for (let i = 0; i < count; i++) {
        array.push(ROADM_V4.parseCSAULinePortObject(buf, idx + i*offset));
    }

    return array;
};

module.exports = ROADM_V4;
