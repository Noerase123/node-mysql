exports.selectAll = (tbl, select = '*') => {
    return `SELECT ${select} FROM ${tbl}`;
}

exports.selectId = (tbl, objId) => {
    return `SELECT * FROM ${tbl} WHERE ${Object.keys(objId)} = ${Object.values(objId)}`
}

exports.add = (tbl, field = {}) => {
    return `INSERT INTO ${tbl} (${Object.keys(field)}) VALUES (${Object.values(field)})`
}

exports.update = (tbl, field = [], objId) => {
    return `UPDATE ${tbl} SET ${field} WHERE ${Object.keys(objId)} = ${Object.values(objId)}`
}

exports.delete = (tbl, objId = {}) => {
    return `DELETE FROM ${tbl} WHERE ${Object.keys(objId)} = ${Object.values(objId)}`
}

exports.createTable = (tbl, column, primaryKey = 'id') => {
    return `CREATE TABLE IF NOT EXISTS ${tbl} ( ${primaryKey} BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY, ${column})`
}