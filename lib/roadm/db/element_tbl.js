// lib/roadm/db/element_tbl.js
const logger = require('../../../lib/log/logger');
const DBMgr = require('../../../db/db_mgr');
const iconv = require('iconv-lite');

const element = {};

/**
 * 입력받는 param에 따라 테이블의 조회 query를 생성
 * @param {object} param DB조회를 위한 parameter
 * @return {string} select query
 */
element.makeSelectQuery = function(param) {
    let query = 'select * from element_tbl';
    let where = '';

    if (param.element_id != undefined) {
        if (where.length > 0) {
            where += ' and ';
        }
        where += `element_id = ${param.element_id}`;
    }

    if (param.seq_no != undefined) {
        if (where.length > 0) {
            where += ' and ';
        }
        where += `seq_no = ${param.seq_no}`;
    }

    // if (param.element_name != undefined) {
    //     if (where.length > 0) {
    //         where += ' and ';
    //     }
    //     // where += `element_name = '${param.element_name}'`;

    //     const decodeData = iconv.encode(
    //         param.element_name, 'euckr').toString();
    //     where += `element_name = '${decodeData.toString()}'`;
    // }

    if (param.ne_address != undefined) {
        if (where.length > 0) {
            where += ' and ';
        }
        where += `ne_address = '${param.ne_address}'`;
    }

    if (where.length > 0) {
        query += ' where ' + where;
    }

    logger.trace(query);
    return query;
};


/**
 * element_tbl 데이터 조회
 * @param {object} param sql parameter
 * @return {array} 조회된 데이터 배열 또는 에러명
 */
element.getData = function(param) {
    return new Promise((resolve, reject) => {
        const pool = DBMgr.mysql.myMemDB;
        pool.getConnection(function(err, conn) {
            if (err) {
                logger.error(err);
                reject(err);
            }

            conn.query(
                element.makeSelectQuery(param),
                function(err, rows, field) {
                    if (err) {
                        logger.error(err);
                        conn.release();
                        reject(err);
                    }
                    conn.release();

                    let resArray = [];
                    rows.forEach((row) => {
                        const decodeData = iconv.decode(
                            row.ELEMENT_NAME, 'euckr').toString();
                        row.ELEMENT_NAME = decodeData.toString();
                        resArray.push(row);
                    });

                    if (resArray.length > 0) {
                        resolve(resArray);
                    } else {
                        logger.warn('no data');
                        reject('no data');
                    }
                }
            );
        });
    });
};

module.exports = element;
