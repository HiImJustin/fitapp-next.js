const db = require('../config/db')

module.exports.addNewLog = (email, userType, action, ip, request) => (
    db.query("Insert into logging(email, userType, action, ip, request)"
    + "Values(?,?,?,?,?)", [email, userType, action, ip, request])
)
module.exports.checkTotalRequests = (email) => (
    db.query('SELECT timestamp, request from logging where timestamp > DATE_SUB(NOW(), INTERVAL 1 DAY) and email = ?', [email] 
    )
);