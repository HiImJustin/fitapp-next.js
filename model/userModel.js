const db = require('../config/db')

module.exports.addUserModel = (age, height, weight, gender) => {
    return db.query('Insert into users (age, height, weight, gender)' 
    + 'Values(?,?,?,?)', [age, height, weight, gender])
}
module.exports.getUsers = () => (
     db.query("Select * from users")
)
module.exports.getUserByUsername = (email) => {
    return db.query("select * from userDetails where email = ?" , [email])
}