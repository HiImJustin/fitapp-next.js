const db = require("../lib/db");

module.exports.addUserModel = (age, height, weight, gender, activity, name, bmr, tdee) => {
    return db.query(
        "Insert into users (age, height, weight, gender , activity, name, bmr, tdee)" 
        + "Values(?,?,?,?,?,?,?,?)",
        [age, height, weight, gender, activity, name, bmr, tdee]
    );
};
module.exports.getUsers = () => db.query("Select * from users");

module.exports.getUserByUsername = (email) => {
    return db.query("select * from userDetails where email = ?", [email]);
};
