
exports.selectAll = (tbl) => {
    return `SELECT * FROM ${tbl}`;
}

exports.selectId = (tbl, objId) => {
    return `SELECT * FROM ${tbl} WHERE ${objId}`
}

exports.add = (tbl, field = [], element) => {


    return `INSERT INTO ${tbl} (${field}) VALUES (${element})`
}

exports.update = (tbl, field, objId) => {
    return `UPDATE ${tbl} SET ${field} WHERE ${objId}`
}

exports.delete = (tbl, objId) => {
    return `DELETE FROM ${tbl} WHERE ${objId}`
}
