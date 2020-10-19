const mysqlConnection = require('../dbconfig')
const method = require('../methods/methods')
const model = require('../models/models/roomModel')

const callBack = (err, status, response) => {
    if (!err) {
        res.status(status).json(response)
    }
    else {
        res.status(status).json(err)
        console.log(err)
    }
}

module.exports.selectAll = (req, res) => {
    mysqlConnection.query(method.selectAll(model.table), (err, rows, fields) => {
        callBack(err, 200, {
            data: rows
        })
    })
}

module.exports.selectById = (req, res) => {
    const id = req.params.id
    if (id === null) {
        res.status(404).json({
            message: 'Data not found'
        })
    }
    else {
        mysqlConnection.query(method.selectId(model.table, {room_id: '?'}), [id], (err, rows, fields) => {
            callBack(err,200, rows[0])
        })
    }
}

module.exports.addRoom = (req, res) => {
    const contain = req.body
    
    const col = {
        bldgName: '?',
        unitNum: '?',
        bedLetter: '?',
        roomType: '?',
        bldgType: '?',
        roomPrice: '?',
        deleted: '?'
    }
    const sql = method.add(model.table, col)
    mysqlConnection.query(sql, [
        contain.bldgName,
        contain.unitNum,
        contain.bedLetter,
        contain.roomType,
        contain.bldgType,
        contain.roomPrice,
        contain.deleted
    ], (err, rows, fields) => {
        callBack(err, 201, {
            message: 'room added successfully'
        })
    })
}

module.exports.updateRoom = (req, res) => {
    const id = req.params.id
    const contain = req.body
    if (id === null) {
        res.status(404).json({
            message: 'Data not found'
        })
    }
    const col = [
        'bldgName = ?',
        'unitNum = ?',
        'bedLetter = ?',
        'roomType = ?',
        'bldgType = ?',
        'roomPrice = ?',
        'deleted = ?'
    ]
    const sql = method.update(model.table, col, {room_id: '?'})
    mysqlConnection.query(sql, [
        contain.bldgName,
        contain.unitNum,
        contain.bedLetter,
        contain.roomType,
        contain.bldgType,
        contain.roomPrice,
        contain.deleted
    ], (err, rows, fields) => {
        callBack(err,200, {
            message: 'room updated successfully'
        })
    })
}

module.exports.deleteRoom = (req, res) => {
    const id = req.params.id
    if (id === null) {
        res.status(404).json({
            message: 'Data not found'
        })
    }
    const sql = method.delete(model.table, {room_id: '?'})
    mysqlConnection.query(sql, [id], (err, rows, fields) => {
        callBack(err, 200, {
            message: 'room deleted successfully'
        })
    })
}