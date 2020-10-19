const mysqlConnection = require('../../dbconfig')
const method = require('../../methods/methods')

const tbl = 'tbl_rooms'

const column = {
    table: tbl,
    primaryID: 'room_id',
    bldgName: 'bldgName VARCHAR(50)',
    unitNum: 'unitNum VARCHAR(50)',
    bedLetter: 'bedLetter VARCHAR(10)',
    roomType: 'roomType VARCHAR(50)',
    bldgType: 'bldgType VARCHAR(50)',
    roomPrice: 'roomPrice DOUBLE',
    deleted: 'deleted INT(11)'
}

const sql = method.createTable(column.table,
    [
        column.bldgName,
        column.unitNum,
        column.bedLetter,
        column.roomType,
        column.bldgType,
        column.roomPrice,
        column.deleted
    ],
    column.primaryID)

const response = (err, result) => {
    if (err) throw err
    console.log(`${column.table} created`);
}

mysqlConnection.query(sql, response)

module.exports.connect = mysqlConnection
module.exports.table = tbl