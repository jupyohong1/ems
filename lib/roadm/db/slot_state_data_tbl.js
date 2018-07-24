// lib/roadm/provision/slotstate.js
const logger = require('../../../lib/log/logger');
const util = require('../../../lib/util/util');
const DBMgr = require('../../../db/db_mgr');
const ROADM_COMMON = require('../roadm_common');
const ROADM_V4 = require('../roadm_v4_common');
const U8100_V1 = require('../roadm_8100_v1_common');
const U6300_V1 = require('../roadm_6300_v1_common');
// const iconv = require('iconv-lite');

const slotStateData = {};

/**
 * @param {object} param sql parameter
 * @return {object} rows or error
 */
slotStateData.getSlotStateData = function(param) {
    return new Promise((function(resolve, reject) {
        const pool = DBMgr.mysql.myMemDB;
        pool.getConnection(function(err, conn) {
            if (err) reject(err);

            conn.query(
                makeSelectQuery(param),
                function(err, rows, field) {
                    if (err) {
                        conn.release();
                        reject(err);
                    }
                    conn.release();

                    let resArray = [];
                    rows.forEach((row) => {
                        const obj = parseSlotStateData(
                            util.HIBYTE(param.ne_type), row);
                        resArray.push(obj);
                    });

                    if (resArray.length > 0) {
                        resolve(resArray);
                    } else {
                        reject(new Error('no data'));
                    }
                }
            );
        });
    }));
};

/**
 * 입력받는 param에 따라 slotStateData 테이블의 조회 query를 생성
 * @param {object} param DB조회를 위한 parameter
 * @return {string} select query
 */
makeSelectQuery = function(param) {
    let query = 'select * from ROADM_SLOT_STATE_DATA_TBL';
    let where = '';
    if (param.element_id != undefined && param.element_id >= 0) {
        if (where.length > 0) {
            where += ` and element_id = ${param.element_id}`;
        } else {
            where += `element_id = ${param.element_id}`;
        }
    }
    if (param.seq_no != undefined && param.seq_no >= 0) {
        if (where.length > 0) {
            where += ` and seq_no = ${param.seq_no}`;
        } else {
            where += `seq_no = ${param.seq_no}`;
        }
    }
    if (param.shelf_id != undefined && param.shelf_id >= 0) {
        if (where.length > 0) {
            where += ` and shelf_id = ${param.shelf_id}`;
        } else {
            where += `shelf_id = ${param.shelf_id}`;
        }
    }
    if (param.slot_id != undefined && param.slot_id >= 0) {
        if (where.length > 0) {
            where += ` and slot_id = ${param.slot_id}`;
        } else {
            where += `slot_id = ${param.slot_id}`;
        }
    }
    if (where.length > 0) {
        query += ' where ' + where;
    }
    return query;
};

/**
 * SlotStateData 테이블의 SYS_PROV_DATA를 BID에 맞게 파싱
 * @param {number} sysId 시스템ID
 * @param {object} row slot단위의 SYS_PROV_DATA
 * @return {object} 파싱된 SYS_PROV_DATA
 */
parseSlotStateData = function(sysId, row) {
    let provData = null;
    const buffer = row.SYS_PROV_DATA;
    switch (sysId) {
        case ROADM_COMMON.SYSID.MPUTYPE_WCU:
        {
            switch (row.PROV_BID) {
                case ROADM_V4.WCS.BID.WCU:
                    {
                        provData = {
                            bd_act: buffer[2],
                            ver: buffer.readUInt16BE(3),
                            time: ROADM_COMMON.parseTimeObject(buffer, 5),
                            name: buffer.slice(12, 32),
                            ptlm: [
                                buffer.slice(33, 45),
                                buffer.slice(46, 58),
                                buffer.slice(59, 71),
                                buffer.slice(72, 84),
                            ],
                        };
                    }
                    break;
                case ROADM_V4.WCS.BID.SCU:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            p_act: [buffer[4], buffer[5]],
                            p_deg: [buffer[6], buffer[7]], // ASIDE=0, BSIDE=1
                        };
                    }
                    break;
                case ROADM_V4.WCS.BID.BAU:
                case ROADM_V4.WCS.BID.BAU_F:
                case ROADM_V4.WCS.BID.BAU_L:
                case ROADM_V4.WCS.BID.BAUp:
                case ROADM_V4.WCS.BID.BAUp_L:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            degree: buffer[4],
                            opmode: buffer[5],
                            acclink: {
                                msa: buffer[6],
                                s1th: buffer.readUInt32BE(7),
                                s2th: buffer.readUInt32BE(11),
                                gain: buffer.readUInt32BE(15),
                                lowtemp: buffer.readUInt32BE(19),
                                hightemp: buffer.readUInt32BE(23),
                            },
                            atten: buffer.readUInt32BE(27),
                            transient: buffer.readUInt32BE(28),
                            sel: buffer.readUInt32BE(29),
                            cal: buffer.readFloatBE(33),
                            apc_mode: buffer[37],
                            apc_max: buffer.readUInt32BE(38),
                            apc_min: buffer.readUInt32BE(42),
                            als_mode: buffer[46],
                            apc_span: buffer.readUInt32BE(47),
                            apc_span_mode: buffer[48],
                        };
                    }
                    break;
                case ROADM_V4.WCS.BID.PAU:
                case ROADM_V4.WCS.BID.PAU_L:
                case ROADM_V4.WCS.BID.PAU_F:
                case ROADM_V4.WCS.BID.PAUp:
                case ROADM_V4.WCS.BID.PAUp_L:
                case ROADM_V4.WCS.BID.LAU:
                case ROADM_V4.WCS.BID.LAU_L:
                case ROADM_V4.WCS.BID.LAUp:
                case ROADM_V4.WCS.BID.LAUp_L:
                case ROADM_V4.WCS.BID.LAUp_H:
                case ROADM_V4.WCS.BID.LAUp_LH:
                case ROADM_V4.WCS.BID.LIU:
                case ROADM_V4.WCS.BID.LIUp:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            degree: buffer[4],
                            opmode: buffer[5],
                            acclink: {
                                msa: buffer[6],
                                s1th: buffer.readUInt32BE(7),
                                s2th: buffer.readUInt32BE(11),
                                gain: buffer.readUInt32BE(15),
                                lowtemp: buffer.readUInt32BE(19),
                                hightemp: buffer.readUInt32BE(23),
                            },
                            atten: buffer.readUInt32BE(27),
                            transient: buffer.readUInt32BE(28),
                            sel: buffer.readUInt32BE(29),
                            cal: buffer.readFloatBE(33),
                            apc_mode: buffer[37],
                            apc_max: buffer.readUInt32BE(38),
                            apc_min: buffer.readUInt32BE(42),
                            als_mode: buffer[46],
                            apc_span: buffer.readUInt32BE(47),
                            apc_span_mode: buffer[48],
                        };
                    }
                    break;
                case ROADM_V4.WCS.BID.RAU_B:
                case ROADM_V4.WCS.BID.RAUp_B:
                case ROADM_V4.WCS.BID.RAUp_BL:
                case ROADM_V4.WCS.BID.RAU_F:
                case ROADM_V4.WCS.BID.RAUp_F:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            degree: buffer[4],
                            laser: buffer[5],
                            mode: buffer[6],
                            gain: buffer.readUInt32BE(7),
                            pumpcurrent: [
                                buffer.readUInt32BE(11),
                                buffer.readUInt32BE(15),
                                buffer.readUInt32BE(19),
                                buffer.readUInt32BE(23),
                            ],
                        };
                    }
                    break;
                case ROADM_V4.WCS.BID.WADU_A:
                case ROADM_V4.WCS.BID.WADU_B:
                case ROADM_V4.WCS.BID.WADU_C:
                case ROADM_V4.WCS.BID.WADU8_A:
                case ROADM_V4.WCS.BID.WADU8_B:
                case ROADM_V4.WCS.BID.WADU8_C:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            side: buffer[4],
                            lambda: ROADM_V4.parseWADUProvLambdaArray(
                                buffer, 5, 40),
                        };
                    }
                    break;
                case ROADM_V4.WCS.BID.WADUp_5A:
                case ROADM_V4.WCS.BID.WADUp_5B:
                case ROADM_V4.WCS.BID.WADUp_5C:
                case ROADM_V4.WCS.BID.WADUp_9A:
                case ROADM_V4.WCS.BID.WADUp_9B:
                case ROADM_V4.WCS.BID.WADUp_9C:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            side: buffer[4],
                            lambda: ROADM_V4.parseWADUProvLambdaArray(
                                buffer, 5, 80),
                        };
                    }
                    break;
                case ROADM_V4.WCS.BID.WSU_5:
                case ROADM_V4.WCS.BID.WSU_2:
                case ROADM_V4.WCS.BID.WSU_9:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            degree: buffer[4],
                            lambda: ROADM_V4.parseWADUProvLambdaArray(
                                buffer, 5, 40),
                        };
                    }
                    break;
                case ROADM_V4.WCS.BID.WSUp_5:
                case ROADM_V4.WCS.BID.WSUp_2:
                case ROADM_V4.WCS.BID.WSUp_9:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            degree: buffer[4],
                            lambda: ROADM_V4.parseWADUProvLambdaArray(
                                buffer, 5, 80),
                        };
                    }
                    break;
                case ROADM_V4.WCS.BID.OPU_1:
                case ROADM_V4.WCS.BID.OPU_4:
                case ROADM_V4.WCS.BID.OPUp_1:
                case ROADM_V4.WCS.BID.OPUp_4:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            p_act: [
                                buffer[4],
                                buffer[5],
                                buffer[6],
                                buffer[7],
                            ],
                            p_dedicate: ROADM_COMMON.parsePIDArray(
                                buffer, 8, 4),
                            p_dir: [
                                buffer[40],
                                buffer[41],
                                buffer[42],
                                buffer[43],
                            ],
                        };
                    }
                    break;
                case ROADM_V4.WCS.BID.OSAU_4:
                case ROADM_V4.WCS.BID.OSAU_8:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            p_act: [],
                            p_degree: [],
                        };

                        for (let i = 0; i < 8; i++) {
                            provData.p_act.push(buffer[4 + i]);
                            provData.p_degree.push(buffer[12 + i]);
                        }
                    }
                    break;
                case ROADM_V4.WCS.BID.DCXU:
                case ROADM_V4.WCS.BID.DCXUp:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            p_degree: buffer[4],
                            p_distance: buffer.readUInt32BE(5),
                        };
                    }
                    break;
                case ROADM_V4.WCS.BID.DCXU_2:
                case ROADM_V4.WCS.BID.DCXUp_2:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            dcxu: [],
                        };

                        const offset = 6;
                        for (let i = 0; i < 2; i++) {
                            let dcxu = {
                                p_act: buffer[4 + i*offset],
                                p_degree: buffer[5 + i*offset],
                                p_distance: buffer.readUInt32BE(6 + i*offset),
                            };
                            provData.dcxu.push(dcxu);
                        }
                    }
                    break;
                case ROADM_V4.WCS.BID.TDCU_A:
                case ROADM_V4.WCS.BID.TDCU_B:
                case ROADM_V4.WCS.BID.TDCUp_A:
                case ROADM_V4.WCS.BID.TDCUp_B:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            p_degree: buffer[4],
                            p_distance: buffer.readUInt32BE(5),
                        };
                    }
                    break;
                case ROADM_V4.WCS.BID.WDU_8:
                case ROADM_V4.WCS.BID.WDU_8E:
                case ROADM_V4.WCS.BID.WDU_9:
                case ROADM_V4.WCS.BID.WDU_9E:
                case ROADM_V4.WCS.BID.WDU_40:
                case ROADM_V4.WCS.BID.WDU_40E:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            usage: buffer[4],
                            d_dir: buffer[5],
                            lambda: ROADM_V4.parseWDUProvLambdaArray(
                                buffer, 6, 40), // 120
                            th_temp_low: buffer.readUInt16BE(126),
                            th_temp_high: buffer.readUInt16BE(128),
                            ch_spacing: buffer.readUInt16BE(130),
                        };
                    }
                    break;
                case ROADM_V4.WCS.BID.WMDU_40:
                case ROADM_V4.WCS.BID.WMDU_40V:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            usage: buffer[4],
                            d_dir: buffer[5],
                            lambda: ROADM_V4.parseWDUProvLambdaArray(
                                buffer, 6, 40), // 120
                            th_temp_low: buffer.readUInt16BE(126),
                            th_temp_high: buffer.readUInt16BE(128),
                            ch_spacing: buffer.readUInt16BE(130),
                        };
                    }
                case ROADM_V4.WCS.BID.WMDUe_40:
                case ROADM_V4.WCS.BID.WMDUp_40:
                case ROADM_V4.WCS.BID.WMDUe_40V:
                case ROADM_V4.WCS.BID.WMDUe_9:
                case ROADM_V4.WCS.BID.WMDUp_9:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            usage: buffer[4],
                            d_dir: buffer[5],
                            lambda: ROADM_V4.parseWDUProvLambdaArray(
                                buffer, 6, 40), // 120
                            th_temp_low: buffer.readUInt16BE(126),
                            th_temp_high: buffer.readUInt16BE(128),
                            ch_spacing: buffer.readUInt16BE(130),
                        };
                    }
                    break;
                case ROADM_V4.WCS.BID.WMU_32:
                case ROADM_V4.WCS.BID.WMU_40:
                case ROADM_V4.WCS.BID.WMU_40C:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            usage: buffer[4],
                            d_dir: buffer[5],
                        };
                    }
                    break;
                case ROADM_V4.WCS.BID.SIU:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            p_degree: buffer[4],
                        };
                    }
                    break;
                default:
                    logger.warn(`unknown BID(${row.PROV_BID})`);
                    break;
            }
        }
        break;
        case ROADM_COMMON.SYSID.MPUTYPE_RCU:
        {
            switch (row.PROV_BID) {
                case ROADM_V4.RCS.BID.RCU:
                    {
                        provData = {
                            bd_act: buffer[2],
                            ver: buffer.readUInt16BE(3),
                            time: ROADM_COMMON.parseTimeObject(buffer, 5),
                            name: buffer.slice(12, 32),
                            ptlm: [
                                buffer.slice(33, 45),
                                buffer.slice(46, 58),
                                buffer.slice(59, 71),
                                buffer.slice(72, 84),
                            ],
                        };
                    }
                    break;
                case ROADM_V4.RCS.BID.SCU:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            p_act: [buffer[4], buffer[5]],
                            p_deg: [buffer[6], buffer[7]], // ASIDE=0, BSIDE=1
                        };
                    }
                    break;
                case ROADM_V4.RCS.BID.LAU:
                case ROADM_V4.RCS.BID.LAU_L:
                case ROADM_V4.RCS.BID.LAU_AW:
                case ROADM_V4.RCS.BID.LAU_DW:
                case ROADM_V4.RCS.BID.LAUp:
                case ROADM_V4.RCS.BID.LAUp_L:
                case ROADM_V4.RCS.BID.LAUp_H:
                case ROADM_V4.RCS.BID.LAUp_LH:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            txdegree: buffer[4],
                            rxdegree: buffer[5],
                            opmode: buffer[6],
                            msa: buffer[7],
                            s1th: buffer.readUInt32BE(8),
                            s2th: buffer.readUInt32BE(12),
                            gain: buffer.readUInt32BE(16),
                            lowtemp: buffer.readUInt32BE(20),
                            hightemp: buffer.readUInt32BE(24),
                            atten: buffer.readUInt32BE(28),
                            transient: buffer[32],
                            sel: buffer[33],
                            cal: buffer.readInt32BE(34),
                            apc_mode: buffer[38],
                            apc_max: buffer.readInt32BE(39),
                            apc_min: buffer.readInt32BE(43),
                            als_mode: buffer[47],
                            apc_span: buffer.readInt32BE(48),
                            apc_span_mode: buffer[52],
                        };
                        if (buffer.length > 52) {
                            provData.apc_mode2 = buffer[53];
                            provData.apc_max2 = buffer.readInt32BE(54);
                            provData.apc_min2 = buffer.readInt32BE(58);
                            provData.atten2 = buffer.readInt32BE(62);
                        }
                    }
                    break;
                case ROADM_V4.RCS.BID.RAU_B:
                case ROADM_V4.RCS.BID.RAUp_B:
                case ROADM_V4.RCS.BID.RAUp_BL:
                case ROADM_V4.RCS.BID.RAU_F:
                case ROADM_V4.RCS.BID.RAUp_F:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            txdegree: buffer[4],
                            rxdegree: buffer[5],
                            laser: buffer[6],
                            mode: buffer[7],
                            gain: buffer.readUInt32BE(8),
                            pumpcurrent: [
                                buffer.readUInt32BE(12),
                                buffer.readUInt32BE(16),
                                buffer.readUInt32BE(20),
                                buffer.readUInt32BE(24),
                            ],
                        };
                    }
                    break;
                case ROADM_V4.RCS.BID.OPU_1:
                case ROADM_V4.RCS.BID.OPU_4:
                case ROADM_V4.RCS.BID.OPUp_1:
                case ROADM_V4.RCS.BID.OPUp_4:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            p_act: [
                                buffer[4],
                                buffer[5],
                                buffer[6],
                                buffer[7],
                            ],
                            p_dedicate: ROADM_COMMON.parsePIDArray(
                                buffer, 8, 4), // 32
                            p_dir: [
                                buffer[40],
                                buffer[41],
                                buffer[42],
                                buffer[43],
                            ],
                        };
                    }
                    break;
                case ROADM_V4.RCS.BID.OSAU_4:
                case ROADM_V4.RCS.BID.OSAU_8:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            p_act: [],
                            p_degree: [],
                        };

                        for (let i = 0; i < 8; i++) {
                            provData.p_act.push(buffer[4 + i]);
                            provData.p_degree.push(buffer[12 + i]);
                        }
                    }
                    break;
                case ROADM_V4.RCS.BID.DCXU:
                case ROADM_V4.RCS.BID.DCXUp:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            p_degree: buffer[4],
                            p_distance: buffer.readUInt32BE(5),
                        };
                    }
                    break;
                case ROADM_V4.RCS.BID.TDCU_A:
                case ROADM_V4.RCS.BID.TDCU_B:
                case ROADM_V4.RCS.BID.TDCUp_A:
                case ROADM_V4.RCS.BID.TDCUp_B:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            p_degree: buffer[4],
                            p_distance: buffer.readUInt32BE(5),
                        };
                    }
                    break;
                default:
                    logger.warn(`unknown BID(${row.PROV_BID})`);
                    break;
            }
        }
        break;
        case ROADM_COMMON.SYSID.MPUTYPE_CCU:
        {
            switch (row.PROV_BID) {
                case ROADM_V4.CCS.BID.CCU:
                    {
                        provData = {
                            bd_act: buffer[2],
                            name: buffer.slice(3, 23),
                            clk: {
                                pclk: buffer[24],
                                plsrc: ROADM_COMMON.parsePIDObject(buffer, 25),
                                slsrc: ROADM_COMMON.parsePIDObject(buffer, 33),
                                ea_sabit: buffer[34],
                                eb_sabit: buffer[35],
                                pstr: buffer[36],
                                sstr: buffer[37],
                                dclk: buffer[38],
                                dcfais: buffer[39],
                            },
                        };
                    }
                    break;
                case ROADM_V4.CCS.BID.OT64U:
                case ROADM_V4.CCS.BID.OT64HU:
                case ROADM_V4.CCS.BID.RG64U:
                case ROADM_V4.CCS.BID.RG2U:
                case ROADM_V4.CCS.BID.SMNU:
                case ROADM_V4.CCS.BID.SMGU:
                case ROADM_V4.CCS.BID.OM01U:
                case ROADM_V4.CCS.BID.OM01U_2:
                case ROADM_V4.CCS.BID.OT3U:
                case ROADM_V4.CCS.BID.DCAU:
                case ROADM_V4.CCS.BID.OT16U:
                case ROADM_V4.CCS.BID.GBEU:
                case ROADM_V4.CCS.BID.OM23U:
                case ROADM_V4.CCS.BID.OPSU:
                case ROADM_V4.CCS.BID.OTNU_C:
                case ROADM_V4.CCS.BID.OTNU_R:
                case ROADM_V4.CCS.BID.OTSU:
                case ROADM_V4.CCS.BID.OM02U:
                case ROADM_V4.CCS.BID.OM12U:
                case ROADM_V4.CCS.BID.OT2U_1:
                case ROADM_V4.CCS.BID.OT2U_2:
                case ROADM_V4.CCS.BID.OT4U:
                case ROADM_V4.CCS.BID.OM24U:
                case ROADM_V4.CCS.BID.OT2HU_2:
                case ROADM_V4.CCS.BID.CSPU_2:
                case ROADM_V4.CCS.BID.CSPU_4:
                case ROADM_V4.CCS.BID.ESPU_4M:
                case ROADM_V4.CCS.BID.ESPU_4S:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            c_add_act: buffer.readUInt32BE(4),
                            c_drop_act: buffer.readUInt32BE(8),
                            l_act: buffer.readUInt32BE(12),
                            line: ROADM_V4.parseLinePortArray(
                                buffer, 16, 2), // 44
                            client: ROADM_V4.parseClientPortArray(
                                buffer, 60, 16), // 848
                            smnu_clk: buffer[908],
                        };
                    }
                    break;
                case ROADM_V4.CCS.BID.CSAU_2A:
                case ROADM_V4.CCS.BID.CSAU_2B:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            l_act: buffer[4],
                            l_port: ROADM_V4.parseCSAULinePortArray(
                                buffer, 5, 2),
                        };
                    }
                    break;
                default:
                    logger.warn(`unknown BID(${row.PROV_BID})`);
                    break;
            }
        }
        break;
        case ROADM_COMMON.SYSID.MPUTYPE_8100_WC:
        {
            switch (row.PROV_BID) {
                case U8100_V1.BID.WS_MRPA_A:
                case U8100_V1.BID.WS_MRPA_B:
                    {
                        provData = {
                            bd_act: buffer[2],
                            ver: buffer.readUInt16BE(3),
                            time: ROADM_COMMON.parseTimeObject(buffer, 5),
                            name: buffer.slice(12, 32),
                            ptlm: [
                                buffer.slice(33, 45),
                                buffer.slice(46, 58),
                                buffer.slice(59, 71),
                                buffer.slice(72, 84),
                            ],
                            p_act: [
                                buffer[85],
                                buffer[86],
                                buffer[87],
                                buffer[88],
                            ],
                            p_degree: [
                                buffer[89],
                                buffer[90],
                                buffer[91],
                                buffer[92],
                            ],
                            ports: buffer[93],
                        };
                    }
                    break;
                case U8100_V1.BID.WS_MRSA_2S:
                case U8100_V1.BID.WS_MRSA_2A:
                case U8100_V1.BID.WS_MRSA_2B:
                case U8100_V1.BID.WS_MRSA_2C:
                case U8100_V1.BID.WS_MRSA_2D:
                case U8100_V1.BID.WS_MRSA_5A:
                case U8100_V1.BID.WS_MRSA_5B:
                case U8100_V1.BID.WS_MRSA_5C:
                case U8100_V1.BID.WS_MRSA_5D:
                case U8100_V1.BID.WS_MRSA_9A:
                case U8100_V1.BID.WS_MRSA_9B:
                case U8100_V1.BID.WS_MRSA_9C:
                case U8100_V1.BID.WS_MRSA_9D:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            degree: buffer[4],
                            lmabda: U8100_V1.parseWSUpProvLambdaArray(
                                buffer, 5, 88), // 1320
                            bpau:
                            U8100_V1.parseBPAUObject(buffer, 1325),
                        };
                    }
                    break;
                case U8100_V1.BID.WS_WMDA_8A:
                case U8100_V1.BID.WS_WMDA_8B:
                case U8100_V1.BID.WS_WMDA_8C:
                case U8100_V1.BID.WS_WMDA_8D:
                case U8100_V1.BID.WS_WMDA_8S:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            degree: buffer[4],
                            bpau: U8100_V1.parseBPAUObject(buffer, 5),
                        };
                    }
                    break;
                case U8100_V1.BID.WS_BPAA_S:
                case U8100_V1.BID.WS_BPAA_A:
                case U8100_V1.BID.WS_BPAA_B:
                case U8100_V1.BID.WS_BPAA_C:
                case U8100_V1.BID.WS_BPAA_D:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            degree: buffer[4],
                            bpau: U8100_V1.parseBPAUObject(buffer, 5),
                        };
                    }
                    break;
                case U8100_V1.BID.WS_ADSA_5A:
                case U8100_V1.BID.WS_ADSA_5B:
                case U8100_V1.BID.WS_ADSA_5C:
                case U8100_V1.BID.WS_ADSA_9A:
                case U8100_V1.BID.WS_ADSA_9B:
                case U8100_V1.BID.WS_ADSA_9C:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            side: buffer[4],
                            lambda: U8100_V1.parseWADUpProvLambdaArray(
                                buffer, 5, 88),
                        };
                    }
                    break;
                case U8100_V1.BID.WS_WMDA_44:
                case U8100_V1.BID.WS_WMDS_44:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            usage: buffer[4],
                            d_dir: buffer[5],
                            lambda: U8100_V1.parseWMDUProvLambdaArray(
                                buffer, 6, 44), // 132
                            t_temp_low: buffer.readUInt16BE(138),
                            t_temp_high: buffer.readUInt16BE(140),
                            c_spacing: buffer.readUInt16BE(142),
                        };
                    }
                    break;
                case U8100_V1.BID.WS_WMDA_88:
                case U8100_V1.BID.WS_WMDS_88:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            usage: buffer[4],
                            d_dir: buffer[5],
                            lambda: U8100_V1.parseWMDUProvLambdaArray(
                                buffer, 6, 88), // 264
                            t_temp_low: buffer.readUInt16BE(270),
                            t_temp_high: buffer.readUInt16BE(272),
                            c_spacing: buffer.readUInt16BE(274),
                        };
                    }
                    break;
                case U8100_V1.BID.WS_WMDAe_8:
                case U8100_V1.BID.WS_WMDAp_8:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            usage: buffer[4],
                            d_dir: buffer[5],
                            lambda: U8100_V1.parseWMDUProvLambdaArray(
                                buffer, 6, 8),
                        };
                    }
                    break;
                case U8100_V1.BID.WS_WMDA_V4:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            usage: buffer[4],
                            d_dir: buffer[5],
                            lambda: U8100_V1.parseWMDUProvLambdaArray(
                                buffer, 6, 4), // 12
                            t_temp_low: buffer.readUInt16BE(18),
                            t_temp_high: buffer.readUInt16BE(20),
                            c_spacing: buffer.readUInt16BE(22),
                        };
                    }
                    break;
                case U8100_V1.BID.WS_WMDA_V8:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            usage: buffer[4],
                            d_dir: buffer[5],
                            lambda: U8100_V1.parseWMDUProvLambdaArray(
                                buffer, 6, 8), // 24
                            t_temp_low: buffer.readUInt16BE(30),
                            t_temp_high: buffer.readUInt16BE(32),
                            c_spacing: buffer.readUInt16BE(34),
                        };
                    }
                    break;
                case U8100_V1.BID.WS_WMDAe_20:
                case U8100_V1.BID.WS_WMDAp_20:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            usage: buffer[4],
                            d_dir: buffer[5],
                            port: U8100_V1.parseWMDA_20PortArray(
                                buffer, 6, 20),
                        };
                    }
                    break;
                case U8100_V1.BID.WS_WMCA_16:
                case U8100_V1.BID.WS_WMCA_32:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            usage: buffer[4],
                            d_dir: buffer[5],
                            port: U8100_V1.parseWMCAPortArray(
                                buffer, 6, 32),
                        };
                    }
                    break;
                case U8100_V1.BID.WS_OSPMA_4:
                case U8100_V1.BID.WS_OSPMA_8:
                case U8100_V1.BID.WS_OSPMA_16:
                case U8100_V1.BID.WS_OSPMA_6F:
                case U8100_V1.BID.WS_OSPMA_12F:
                case U8100_V1.BID.WS_OCPMA_4:
                case U8100_V1.BID.WS_OCPMA_8:
                case U8100_V1.BID.WS_OCPMA_16:
                case U8100_V1.BID.WS_OCPMA_4F:
                case U8100_V1.BID.WS_OCPMA_8F:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            p_act: [],
                            p_degree: [],
                        };

                        for (let i = 0; i < 16; i++) {
                            p_act.push(buffer[4 + i]);
                            p_degree.push(buffer[20 + i]);
                        }
                    }
                    break;
                case U8100_V1.BID.WS_OLPMA_4:
                case U8100_V1.BID.WS_OLPMA_8:
                case U8100_V1.BID.WS_OLPMA_16:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            p_act: [],
                            distance: [],
                        };

                        for (let i = 0; i < 16; i++) {
                            p_act.push(buffer[4 + i]);
                            distance.push(buffer[20 + i]);
                        }
                    }
                    break;
                case U8100_V1.BID.WS_DCXA:
                case U8100_V1.BID.WS_DCFS:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            p_act: buffer[4],
                            p_degree: buffer[5],
                            p_distance: buffer[6],
                        };
                    }
                    break;
                case U8100_V1.BID.WS_TDCA_120:
                case U8100_V1.BID.WS_TDCA_140:
                case U8100_V1.BID.WS_TDCA_160:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            p_degree: buffer[5],
                            p_distance: buffer[6],
                        };
                    }
                    break;
                case U8100_V1.BID.WS_RAFA_10:
                case U8100_V1.BID.WS_RABA_15:
                case U8100_V1.BID.WS_RABA_20:
                case U8100_V1.BID.WS_RABA_25:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            degree: buffer[4],
                            laser: buffer[5],
                            mode: buffer[6],
                            gain: buffer.readUInt32BE(7),
                            pump_current: [
                                buffer.readUInt32BE(11),
                                buffer.readUInt32BE(15),
                                buffer.readUInt32BE(19),
                                buffer.readUInt32BE(23),
                            ],
                        };
                    }
                    break;
                case U8100_V1.BID.WS_ILAA_A:
                case U8100_V1.BID.WS_ILAA_B:
                case U8100_V1.BID.WS_ILAA_C:
                case U8100_V1.BID.WS_ILAA_D:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            t_degree: buffer[4],
                            r_degree: buffer[5],
                            opmode: buffer[6],
                            msa: buffer[7],
                            gain: buffer.readUInt32BE(8),
                            mid_atten: buffer.readUInt32BE(12),
                            end_atten: buffer.readUInt32BE(16),
                            mapc_mode: buffer[20],
                            mapc_max: buffer.readInt32BE(21),
                            mapc_min: buffer.readInt32BE(25),
                            eapc_mode: buffer[29],
                            eapc_max: buffer.readInt32BE(33),
                            eapc_min: buffer.readInt32BE(37),
                            als_mode: buffer[41],
                            apc_span: buffer.readUInt32BE(45),
                            apc_span_mode: buffer[49],
                        };
                    }
                    break;
                case U8100_V1.BID.WS_OLCA:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            p_act: [],
                            p_degree: [],
                            p_csid: [],
                            p_cuid: [],
                            p_cnpo: [],
                        };

                        for (let i = 0; i < 4; i++) {
                            p_act.push(buffer[4 + i]);
                            p_degree.push(buffer[8 + i]);
                            p_csid.push(buffer[12 + i]);
                            p_cuid.push(buffer[16 + i]);
                            p_cnpo.push(buffer[20 + i]);
                        }
                    }
                    break;
                case U8100_V1.BID.WS_OSPA_4S:
                case U8100_V1.BID.WS_OSPA_4M:
                case U8100_V1.BID.WS_OSPS_8S:
                case U8100_V1.BID.WS_OSPS_8M:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                        };
                    }
                    break;
                case U8100_V1.BID.CS_OTUXA:
                case U8100_V1.BID.CS_OT2A_2:
                case U8100_V1.BID.CS_OT2EA_4:
                case U8100_V1.BID.CS_OT2A_4:
                case U8100_V1.BID.CS_OM24A:
                case U8100_V1.BID.CS_OT4A:
                case U8100_V1.BID.CS_OTUC1A:
                case U8100_V1.BID.CS_OTUC2A:
                    {
                        switch (row.FID_SYS_PROV) {
                            case U8100_V1.FID.WDM_RTRV_SYS_PROV_FID_V1:
                                {
                                    provData = {
                                        ports: buffer[2],
                                        bd_act: buffer[3],
                                        c_add_act: buffer.readUInt32BE(4),
                                        c_drop_act: buffer.readUInt32BE(8),
                                        l_act: buffer.readUInt32BE(12),
                                        line: U8100_V1.parseLinePortArray(
                                            buffer, 14, 2), // 46
                                        client: U8100_V1.parseClientPortArray(
                                            buffer, 60, 16), // 832
                                        pair_slot: buffer[892],
                                    };
                                }
                                break;
                            case U8100_V1.FID.WDM_RTRV_SYS_PROV_8100_FID_V2:
                                {
                                    provData = {
                                        ports: buffer[2],
                                        bd_act: buffer[3],
                                        c_add_act: buffer.readUInt32BE(4),
                                        c_drop_act: buffer.readUInt32BE(8),
                                        dsp_mode: buffer[12],
                                        res1: buffer[13],
                                        l_act: buffer.readUInt32BE(14),
                                        line: U8100_V1.parseLinePortArray(
                                            buffer, 16, 2), // 46
                                        client: U8100_V1.parseClientPortArrayV2(
                                            buffer, 62, 16), // 848
                                        pair_slot: buffer[910],
                                    };
                                }
                                break;
                            case U8100_V1.FID.WDM_RTRV_SYS_PROV_8100_FID_V3:
                                {
                                    provData = {
                                        ports: buffer[2],
                                        bd_act: buffer[3],
                                        c_add_act: buffer.readUInt32BE(4),
                                        c_drop_act: buffer.readUInt32BE(8),
                                        dsp_mode: buffer[12],
                                        res1: buffer[13],
                                        l_act: buffer.readUInt32BE(14),
                                        line: U8100_V1.parseLinePortArray(
                                            buffer, 16, 4), // 46
                                        client: U8100_V1.parseClientPortArrayV2(
                                            buffer, 108, 16), // 848
                                        pair_slot: buffer[956],
                                    };
                                }
                                break;
                            default:
                                logger.warn(`unknown FID(${row.FID_SYS_PROV})`);
                                break;
                        }
                    }
                    break;
                default:
                    logger.warn(`unknown BID(${row.PROV_BID})`);
                    break;
            }
        }
        break;
        case ROADM_COMMON.SYSID.MPUTYPE_6300_WC:
        {
            switch (row.PROV_BID) {
                case U6300_V1.BID.WS_MRPA_A:
                case U6300_V1.BID.WS_MRPA_B:
                    {
                        provData = {
                            bd_act: buffer[2],
                            ver: buffer.readUInt16BE(3),
                            time: ROADM_COMMON.parseTimeObject(buffer, 5),
                            name: buffer.slice(12, 32),
                            ptlm: [
                                buffer.slice(33, 45),
                                buffer.slice(46, 58),
                                buffer.slice(59, 71),
                                buffer.slice(72, 84),
                            ],
                            p_act: [
                                buffer[85],
                                buffer[86],
                                buffer[87],
                                buffer[88],
                            ],
                            p_degree: [
                                buffer[89],
                                buffer[90],
                                buffer[91],
                                buffer[92],
                            ],
                            ports: buffer[93],
                        };
                    }
                    break;
                case U6300_V1.BID.WS_MRSA_2S:
                case U6300_V1.BID.WS_MRSA_2A:
                case U6300_V1.BID.WS_MRSA_2B:
                case U6300_V1.BID.WS_MRSA_2C:
                case U6300_V1.BID.WS_MRSA_2D:
                case U6300_V1.BID.WS_MRSA_5A:
                case U6300_V1.BID.WS_MRSA_5B:
                case U6300_V1.BID.WS_MRSA_5C:
                case U6300_V1.BID.WS_MRSA_5D:
                case U6300_V1.BID.WS_MRSA_9A:
                case U6300_V1.BID.WS_MRSA_9B:
                case U6300_V1.BID.WS_MRSA_9C:
                case U6300_V1.BID.WS_MRSA_9D:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            degree: buffer[4],
                            lmabda: U6300_V1.parseWSUpProvLambdaArray(
                                buffer, 5, 88), // 1320
                            bpau: U6300_V1.parseBPAUObject(buffer, 1325),
                        };
                    }
                    break;
                case U6300_V1.BID.WS_WMDA_8A:
                case U6300_V1.BID.WS_WMDA_8B:
                case U6300_V1.BID.WS_WMDA_8C:
                case U6300_V1.BID.WS_WMDA_8D:
                case U6300_V1.BID.WS_WMDA_8S:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            degree: buffer[4],
                            bpau: U6300_V1.parseBPAUObject(buffer, 5),
                        };
                    }
                    break;
                case U6300_V1.BID.WS_BPAA_S:
                case U6300_V1.BID.WS_BPAA_A:
                case U6300_V1.BID.WS_BPAA_B:
                case U6300_V1.BID.WS_BPAA_C:
                case U6300_V1.BID.WS_BPAA_D:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            degree: buffer[4],
                            bpau: U6300_V1.parseBPAUObject(buffer, 5),
                        };
                    }
                    break;
                case U6300_V1.BID.WS_ADSA_5A:
                case U6300_V1.BID.WS_ADSA_5B:
                case U6300_V1.BID.WS_ADSA_5C:
                case U6300_V1.BID.WS_ADSA_9A:
                case U6300_V1.BID.WS_ADSA_9B:
                case U6300_V1.BID.WS_ADSA_9C:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            side: buffer[4],
                            lambda: U6300_V1.parseWADUpProvLambdaArray(
                                buffer, 5, 88),
                        };
                    }
                    break;
                case U6300_V1.BID.WS_WMDA_44:
                case U6300_V1.BID.WS_WMDS_40:
                case U6300_V1.BID.WS_WMDS_44:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            usage: buffer[4],
                            d_dir: buffer[5],
                            lambda: U6300_V1.parseWMDUProvLambdaArray(
                                buffer, 6, 44), // 132
                            t_temp_low: buffer.readUInt16BE(138),
                            t_temp_high: buffer.readUInt16BE(140),
                            c_spacing: buffer.readUInt16BE(142),
                        };
                    }
                    break;
                case U6300_V1.BID.WS_WMDA_88:
                case U6300_V1.BID.WS_WMDS_88:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            usage: buffer[4],
                            d_dir: buffer[5],
                            lambda: U6300_V1.parseWMDUProvLambdaArray(
                                buffer, 6, 88), // 264
                            t_temp_low: buffer.readUInt16BE(270),
                            t_temp_high: buffer.readUInt16BE(272),
                            c_spacing: buffer.readUInt16BE(274),
                        };
                    }
                    break;
                case U6300_V1.BID.WS_WMDAp_8R:
                case U6300_V1.BID.WS_WMDA_8R1:
                case U6300_V1.BID.WS_WMDA_8R2:
                case U6300_V1.BID.WS_WMDAe_8R3:
                case U6300_V1.BID.WS_WMDA_8R4:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            usage: buffer[4],
                            d_dir: buffer[5],
                            lambda: U6300_V1.parseWMDUProvLambdaArray(
                                buffer, 6, 8),
                        };
                    }
                    break;
                case U6300_V1.BID.WS_WMDA_V4:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            usage: buffer[4],
                            d_dir: buffer[5],
                            lambda: U6300_V1.parseWMDUProvLambdaArray(
                                buffer, 6, 4), // 12
                            t_temp_low: buffer.readUInt16BE(18),
                            t_temp_high: buffer.readUInt16BE(20),
                            c_spacing: buffer.readUInt16BE(22),
                        };
                    }
                    break;
                case U6300_V1.BID.WS_WMDA_V8:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            usage: buffer[4],
                            d_dir: buffer[5],
                            lambda: U6300_V1.parseWMDUProvLambdaArray(
                                buffer, 6, 8), // 24
                            t_temp_low: buffer.readUInt16BE(30),
                            t_temp_high: buffer.readUInt16BE(32),
                            c_spacing: buffer.readUInt16BE(34),
                        };
                    }
                    break;
                case U6300_V1.BID.WS_WMDAe_20:
                case U6300_V1.BID.WS_WMDAp_20:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            usage: buffer[4],
                            d_dir: buffer[5],
                            port: U6300_V1.parseWMDA_20PortArray(
                                buffer, 6, 20),
                        };
                    }
                    break;
                case U6300_V1.BID.WS_WMCA_16:
                case U6300_V1.BID.WS_WMCA_32:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            usage: buffer[4],
                            d_dir: buffer[5],
                            port: U6300_V1.parseWMCAPortArray(
                                buffer, 6, 32),
                        };
                    }
                    break;
                case U6300_V1.BID.WS_OSPMA_4:
                case U6300_V1.BID.WS_OSPMA_8:
                case U6300_V1.BID.WS_OSPMA_16:
                case U6300_V1.BID.WS_OSPMA_6F:
                case U6300_V1.BID.WS_OSPMA_12F:
                case U6300_V1.BID.WS_OCPMA_4:
                case U6300_V1.BID.WS_OCPMA_8:
                case U6300_V1.BID.WS_OCPMA_16:
                case U6300_V1.BID.WS_OCPMA_4F:
                case U6300_V1.BID.WS_OCPMA_8F:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            p_act: [],
                            p_degree: [],
                        };

                        for (let i = 0; i < 16; i++) {
                            p_act.push(buffer[4 + i]);
                            p_degree.push(buffer[20 + i]);
                        }
                    }
                    break;
                case U6300_V1.BID.WS_OLPMA_4:
                case U6300_V1.BID.WS_OLPMA_8:
                case U6300_V1.BID.WS_OLPMA_16:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            p_act: [],
                            distance: [],
                        };

                        for (let i = 0; i < 16; i++) {
                            p_act.push(buffer[4 + i]);
                            distance.push(buffer[20 + i]);
                        }
                    }
                    break;
                case U6300_V1.BID.WS_DCXA:
                case U6300_V1.BID.WS_DCFS:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            p_act: buffer[4],
                            p_degree: buffer[5],
                            p_distance: buffer[6],
                        };
                    }
                    break;
                case U6300_V1.BID.WS_TDCA_120:
                case U6300_V1.BID.WS_TDCA_140:
                case U6300_V1.BID.WS_TDCA_160:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            p_degree: buffer[5],
                            p_distance: buffer[6],
                        };
                    }
                    break;
                case U6300_V1.BID.WS_RAFA_10:
                case U6300_V1.BID.WS_RABA_15:
                case U6300_V1.BID.WS_RABA_20:
                case U6300_V1.BID.WS_RABA_25:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            degree: buffer[4],
                            laser: buffer[5],
                            mode: buffer[6],
                            gain: buffer.readUInt32BE(7),
                            pump_current: [
                                buffer.readUInt32BE(11),
                                buffer.readUInt32BE(15),
                                buffer.readUInt32BE(19),
                                buffer.readUInt32BE(23),
                            ],
                        };
                    }
                    break;
                case U6300_V1.BID.WS_ILAA_A:
                case U6300_V1.BID.WS_ILAA_B:
                case U6300_V1.BID.WS_ILAA_C:
                case U6300_V1.BID.WS_ILAA_D:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            t_degree: buffer[4],
                            r_degree: buffer[5],
                            opmode: buffer[6],
                            msa: buffer[7],
                            gain: buffer.readUInt32BE(8),
                            mid_atten: buffer.readUInt32BE(12),
                            end_atten: buffer.readUInt32BE(16),
                            mapc_mode: buffer[20],
                            mapc_max: buffer.readInt32BE(21),
                            mapc_min: buffer.readInt32BE(25),
                            eapc_mode: buffer[29],
                            eapc_max: buffer.readInt32BE(33),
                            eapc_min: buffer.readInt32BE(37),
                            als_mode: buffer[41],
                            apc_span: buffer.readUInt32BE(45),
                            apc_span_mode: buffer[49],
                        };
                    }
                    break;
                case U6300_V1.BID.WS_OLCA:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                            p_act: [],
                            p_degree: [],
                            p_csid: [],
                            p_cuid: [],
                            p_cnpo: [],
                        };

                        for (let i = 0; i < 4; i++) {
                            p_act.push(buffer[4 + i]);
                            p_degree.push(buffer[8 + i]);
                            p_csid.push(buffer[12 + i]);
                            p_cuid.push(buffer[16 + i]);
                            p_cnpo.push(buffer[20 + i]);
                        }
                    }
                    break;
                case U6300_V1.BID.WS_OSPA_4S:
                case U6300_V1.BID.WS_OSPA_4M:
                case U6300_V1.BID.WS_OSPS_8S:
                case U6300_V1.BID.WS_OSPS_8M:
                    {
                        provData = {
                            ports: buffer[2],
                            bd_act: buffer[3],
                        };
                    }
                    break;
                case U6300_V1.BID.CS_OTUXA:
                case U6300_V1.BID.CS_OT2A_2:
                case U6300_V1.BID.CS_OT2EA_4:
                case U6300_V1.BID.CS_OT2A_4:
                case U6300_V1.BID.CS_OM24A:
                case U6300_V1.BID.CS_OT4A:
                case U6300_V1.BID.CS_OTUC1A:
                case U6300_V1.BID.CS_OTUC2A:
                    {
                        switch (row.FID_SYS_PROV) {
                            case U6300_V1.FID.WDM_RTRV_SYS_PROV_6300_FID:
                                {
                                    provData = {
                                        ports: buffer[2],
                                        bd_act: buffer[3],
                                        c_add_act: buffer.readUInt32BE(4),
                                        c_drop_act: buffer.readUInt32BE(8),
                                        dsp_mode: buffer[12],
                                        res1: buffer[13],
                                        l_act: buffer.readUInt32BE(14),
                                        line: U6300_V1.parseLinePortArray(
                                            buffer, 16, 4), // 92
                                        client: U6300_V1.parseClientPortArrayV2(
                                            buffer, 108, 16), // 848
                                        pair_slot: buffer[956],
                                    };
                                }
                                break;
                            default:
                                logger.warn(`unknown FID(${row.FID_SYS_PROV})`);
                                break;
                        }
                    }
                    break;
                default:
                    logger.warn(`unknown BID(${row.PROV_BID})`);
                    break;
            }
        }
        break;
        default:
        break;
    }

    const obj = {
        element_id: row.ELEMENT_ID,
        seq_no: row.SEQ_NO,
        shelf_id: row.SHELF_ID,
        slot_id: row.SLOT_ID,
        prov_bid: row.PROV_BID,
        prov_data: provData,
    };
    return obj;
};

module.exports = slotStateData;
