// lib/roadm/roadm_6300_v1_common.js
const ROADM_6300_V1 = {};

ROADM_6300_V1.SHELF_ID = {
    SH1: 0x40,
    SH2: 0x41,
    SH3: 0x42,
    SH4: 0x43,
    SH5: 0x44,
    SH6: 0x45,
    SH7: 0x46,
    SH8: 0x47,
    SH9: 0x48,
    SH10: 0x49,
    SH11: 0x4A,
    SH12: 0x4B,
    SH13: 0x4C,
    SH14: 0x4D,
    SH15: 0x4E,
    SH16: 0x4F,
    SH17: 0x50,
    SH18: 0x51,
    SH19: 0x52,
    SH20: 0x53,
    SH21: 0x54,
    SH22: 0x55,
};

ROADM_6300_V1.UID = {
    S_01: 0,
    S_02: 1,
    S_03: 2,
    S_04: 3,
    S_05: 4,
    S_06: 5,
    S_07: 6,
    S_08: 7,
    S_09: 8,
    S_10: 9,
    S_11: 10,
    S_12: 11,
    S_13: 12,
    S_14: 13,
    S_15: 14,
    S_16: 15,
    S_17: 16,
    S_18: 17,
    S_19: 18,
    S_20: 19,
    S_21: 20,
    S_22: 21,
    S_23: 22,
    S_24: 23,
    SC_1: 24,
    SC_2: 25,
    MRPA_A: 26,
    MRPA_B: 27,
    S_1G: 28,
    S_2G: 29,
    S_3G: 30,
    S_4G: 31,
    S_5G: 32,
    S_6G: 33,
    S_7G: 34,
    S_8G: 35,
    MRPA: 36,
};

ROADM_6300_V1.BID = {
    WS_BLK: 0,
    WS_MRPA: 1,
    WS_MRPA_A: 1,
    WS_MRPA_B: 2,
    WS_SCU: 5,
    WS_UNKNOWN: 8,
    WS_MRSA_2S: 10,
    WS_MRSA_2A: 11,
    WS_MRSA_2B: 12,
    WS_MRSA_5A: 14,
    WS_MRSA_5B: 15,
    WS_MRSA_9A: 17,
    WS_MRSA_9B: 18,
    WS_MRSA_2C: 19,
    WS_MRSA_5C: 20,
    WS_MRSA_9C: 21,
    WS_MRSA_2D: 22,
    WS_MRSA_5D: 23,
    WS_MRSA_9D: 24,
    WS_ADSA_5A: 25,
    WS_ADSA_5B: 26,
    WS_ADSA_5C: 27,
    WS_ADSA_9A: 28,
    WS_ADSA_9B: 29,
    WS_ADSA_9C: 30,
    WS_WMDA_V4: 31,
    WS_WMDA_V8: 32,
    WS_WMDA_44: 33,
    WS_WMDA_88: 34,
    WS_WMDS_44: 35,
    WS_WMDS_88: 36,
    WS_WMCA_16: 37,
    WS_WMCA_32: 38,
    WS_WMDAe_20: 39,
    WS_WMDAp_20: 40,
    WS_OSPMA_4: 41,
    WS_OSPMA_8: 42,
    WS_OSPMA_16: 43,
    WS_OLPMA_4: 44,
    WS_OLPMA_8: 45,
    WS_OLPMA_16: 46,
    WS_DCXA: 47,
    WS_OCPMA_4: 48,
    WS_OCPMA_8: 49,
    WS_OCPMA_16: 50,
    WS_WMDA_8A: 51,
    WS_WMDA_8B: 52,
    WS_WMDA_8C: 53,
    WS_WMDA_8D: 54,
    WS_WMDA_8S: 55,
    WS_OSPA_4S: 56,
    WS_OSPA_4M: 57,
    WS_TDCA_120: 58,
    WS_TDCA_140: 59,
    WS_TDCA_160: 60,
    WS_RAFA_10: 61,
    WS_RABA_15: 62,
    WS_RABA_20: 63,
    WS_RABA_25: 64,
    WS_OSPMA_6F: 65,
    WS_OSPMA_12F: 66,
    WS_ILAA_A: 67,
    WS_ILAA_B: 68,
    WS_ILAA_C: 69,
    WS_ILAA_D: 70,
    WS_OLCA: 71,
    WS_WMDAe_8: 72,
    WS_WMDAp_8: 73,
    WS_BPAA_S: 74,
    WS_BPAA_A: 75,
    WS_BPAA_B: 76,
    WS_BPAA_C: 77,
    WS_BPAA_D: 78,
    WS_OSPS_8S: 79,
    WS_OSPS_8M: 80,
    WS_DCFS: 81,
    WS_OCPMA_4F: 82,
    WS_OCPMA_8F: 83,
    WS_WMDS_40: 84,
    WS_WMDA_8R1: 85,
    WS_WMDA_8R2: 86,
    WS_WMDAe_8R3: 87,
    WS_WMDA_8R4: 88,
    WS_WMDAp_8R: 89,
    WS_OLPA_1: 90,
    WS_OLPA_3: 91,
    WS_OSPS: 92,
    CS_START: 120,
    CS_OTUXA: 121,
    CS_OT2A_2: 122,
    CS_OM24A: 123,
    CS_OT4A: 124,
    CS_OTUC2A: 125,
    CS_OT2EA_4: 126,
    CS_OLPA: 127,
    CS_OTUC1A: 128,
    CS_OT2A_4: 129,
    CS_UNKNOWN: 130,
};

ROADM_6300_V1.FID = {
    WDM_RTRV_SYS_PROV_6300_FID: 4756,
};


/**
 * parse WSUp lambda object
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @return {object} lambda object
 */
ROADM_6300_V1.parseWSUpProvLambdaObject = function(buf, idx) {
    let lambda = {
        port_assign: buf[idx],
        atten: buf.readUInt16BE(idx+1),
        op_mode: buf[idx+3],
        o_power: buf.readInt16BE(idx+4),
        mode: buf[idx+6],
        max: buf.readInt16BE(idx+7),
        min: buf.readInt16BE(idx+9),
        uc_from: buf.readUInt16BE(idx+11),
        uc_to: buf.readUInt16BE(idx+13),
    };
    return lambda;
};

/**
 * parse WSUp lambda array
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @param {number} count array count
 * @return {array} lambda array
 */
ROADM_6300_V1.parseWSUpProvLambdaArray = function(buf, idx, count) {
    const offset = 15;
    let array = [];

    for (let i = 0; i < count; i++) {
        array.push(
            ROADM_6300_V1.parseWSUpProvLambdaObject(buf, idx + i*offset)
        );
    }

    return array;
};

/**
 * parse WADUp lambda object
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @return {object} lambda object
 */
ROADM_6300_V1.parseWADUpProvLambdaObject = function(buf, idx) {
    let lambda = {
        port_assign: buf[idx],
        atten: buf.readUInt16BE(idx+1),
        op_mode: buf[idx+3],
        o_power: buf.readInt16BE(idx+4),
        mode: buf[idx+6],
        max_temp: buf.readInt16BE(idx+7),
        min_temp: buf.readInt16BE(idx+9),
        uc_from: buf.readUInt16BE(idx+11),
        uc_to: buf.readUInt16BE(idx+13),
    };
    return lambda;
};

/**
 * parse WADUp lambda array
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @param {number} count array count
 * @return {array} lambda array
 */
ROADM_6300_V1.parseWADUpProvLambdaArray = function(buf, idx, count) {
    const offset = 15;
    let array = [];

    for (let i = 0; i < count; i++) {
        array.push(
            ROADM_6300_V1.parseWADUpProvLambdaObject(buf, idx + i*offset)
        );
    }

    return array;
};

/**
 * parse WMDU lambda object
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @return {object} lambda object
 */
ROADM_6300_V1.parseWMDUProvLambdaObject = function(buf, idx) {
    let lambda = {
        pa: buf[idx],
        attn: buf.readUInt16BE(idx+1),
    };
    return lambda;
};

/**
 * parse WMDU lambda array
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @param {number} count array count
 * @return {array} lambda array
 */
ROADM_6300_V1.parseWMDUProvLambdaArray = function(buf, idx, count) {
    const offset = 3;
    let array = [];

    for (let i = 0; i < count; i++) {
        array.push(
            ROADM_6300_V1.parseWMDUProvLambdaObject(buf, idx + i*offset)
        );
    }

    return array;
};

/**
 * parse BAU, PAU object
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @return {object} BAU, PAU object
 */
ROADM_6300_V1.parseBPAUObject = function(buf, idx) {
    let obj = {
        opmode: buf[idx],
        msa: buf[idx+1],
        s1th: buf.readUInt32BE(idx+2),
        s2th: buf.readUInt32BE(idx+6),
        gain: buf.readUInt32BE(idx+10),
        owtemp: buf.readUInt32BE(idx+14),
        hightemp: buf.readUInt32BE(idx+18),
        atten: buf.readUInt32BE(idx+22),
        transient: buf[idx+26],
        sel: buf[idx+27],
        cal: buf.readInt32BE(idx+28),
        apc_mode: buf[idx+32],
        apc_max: buf.readUInt32BE(idx+33),
        apc_min: buf.readUInt32BE(idx+37),
        als_mode: buf[idx+41],
        apc_span: buf.readUInt32BE(idx+42),
        apc_span_mode: buf[idx+46],
    };

    return obj;
};

/**
 * parse BAU, PAU array
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @param {number} count array count
 * @return {object} BAU, PAU object
 */
ROADM_6300_V1.parseBPAUArray = function(buf, idx, count) {
    const offset = 47;
    let array = [];

    for (let i = 0; i < count; i++) {
        array.push(
            ROADM_6300_V1.parseBPAUObject(buf, idx + i*offset)
        );
    }

    return array;
};

/**
 * parse WMDA_20 port Object
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @return {object} WMDA_20 port object
 */
ROADM_6300_V1.parseWMDA_20PortObject = function(buf, idx) {
    let obj = {
        lambda: buf[idx],
        slice_num: buf[idx + 1],
        add_attn: buf.readUInt16BE(idx+2),
        drop_attn: buf.readUInt16BE(idx+4),
    };

    return obj;
};

/**
 * parse WMDA_20 port array
 * @param {buffer} buf binary buffer
 * @param {number} idx  start index
 * @param {number} count array count
 * @return {array} WMDA_20 port arrray
 */
ROADM_6300_V1.parseWMDA_20PortArray = function(buf, idx, count) {
    const offset = 6;
    let array = [];

    for (let i = 0; i < count; i++) {
        array.push(ROADM_6300_V1.parseWMDA_20PortObject(buf, idx + i*offset));
    }

    return array;
};

/**
 * parse WMCA port Object
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @return {object} WMCA port object
 */
ROADM_6300_V1.parseWMCAPortObject = function(buf, idx) {
    let obj = {
        pa: buf[idx],
        lambda: buf[idx+1],
        slice_num: buf[idx+2],
    };

    return obj;
};

/**
 * parse WMCA port array
 * @param {buffer} buf binary buffer
 * @param {number} idx  start index
 * @param {number} count array count
 * @return {array} WMCA port arrray
 */
ROADM_6300_V1.parseWMCAPortArray = function(buf, idx, count) {
    const offset = 6;
    let array = [];

    for (let i = 0; i < count; i++) {
        array.push(ROADM_6300_V1.parseWMCAPortObject(buf, idx + i*offset));
    }

    return array;
};

/**
 * parse line port
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @return {object} line port
 */
ROADM_6300_V1.parseLinePortObject = function(buf, idx) {
    let port = {
        if_mode: buf[idx],
        lambda: buf[idx + 1],
        sw_wss: buf[idx + 2],
        sw_revt: buf[idx + 3],
        fec_mode: buf[idx + 4],
        laser: buf[idx + 5],
        ds_value: buf.readInt16BE(idx + 6), // ~ 8
        pair_slot: ROADM_COMMON.parsePIDObject(buf, idx + 8), // ~ 16
        edfa_outpwr: buf[idx + 16],
        dli: buf[idx + 17],
        ber: buf[idx + 18],
        efec_mode: buf[idx + 19],
        txsd_fec: buf[idx + 20],
        rxsd_fec: buf[idx + 21],
        drop_alm: buf[idx + 22],
    };

    return port;
};

/**
 * parse line port array
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @param {number} count array count
 * @return {array} line port array
 */
ROADM_6300_V1.parseLinePortArray = function(buf, idx, count) {
    const offset = 23;
    let array = [];

    for (let i = 0; i < count; i++) {
        array.push(
            ROADM_6300_V1.parseLinePortObject(buf, idx + i*offset)
        );
    }

    return array;
};

/**
 * parse client port
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @return {object} client port
 */
ROADM_6300_V1.parseClientPortObject = function(buf, idx) {
    let port = {
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

    return port;
};

/**
 * parse client port array
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @param {number} count array count
 * @return {array} clinet port array
 */
ROADM_6300_V1.parseClientPortArray = function(buf, idx, count) {
    const offset = 52;
    let array = [];

    for (let i = 0; i < count; i++) {
        array.push(
            ROADM_6300_V1.parseClientPortObject(buf, idx + i*offset)
        );
    }

    return array;
};

/**
 * parse client port version2
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @return {object} client port
 */
ROADM_6300_V1.parseClientPortObjectV2 = function(buf, idx) {
    let port = {
        if_mode: buf[idx],
        sw_mode: buf[idx + 1],
        llcf: buf[idx + 2],
        auto_nego: buf[idx + 3],
        flow_ctrl: buf[idx + 4],
        laser: buf[idx + 5],
        revt: buf[idx + 6],
        wtr: buf[idx + 7],
        prot_bd: buf[idx + 8],
        ber: buf[idx + 9],
        name: buf.slice(idx + 10, idx + 52),
        holdoff: buf[idx + 53],
    };

    return port;
};

/**
 * parse client port array version2
 * @param {buffer} buf binary buffer
 * @param {number} idx start index
 * @param {number} count array count
 * @return {array} clinet port array
 */
ROADM_6300_V1.parseClientPortArrayV2 = function(buf, idx, count) {
    const offset = 53;
    let array = [];

    for (let i = 0; i < count; i++) {
        array.push(
            ROADM_6300_V1.parseClientPortObjectV2(buf, idx + i*offset)
        );
    }

    return array;
};

module.exports = ROADM_6300_V1;
