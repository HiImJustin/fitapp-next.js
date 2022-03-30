const db = require('../config/db')

module.exports.addNewLog = (email, userType, action, ip) => (
    db.query("Insert into logging(email, userType, action, ip)"
    + "Values(?,?,?,?)", [email, userType, action, ip])
)