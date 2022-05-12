import db from "../lib/db";
import { query } from "../lib/db";

module.exports.addFood = (foodName, calPer100, protien, carbs, fat) =>
    db.query(
        "Insert into food(foodName, calPer100, protien, carbs, fat)" +
            "Values(?,?,?,?,?)",
        [foodName, calPer100, protien, carbs, fat]
    );
module.exports.addCustomMeal = (
    customMealName,
    calPer100,
    protien,
    carbs,
    fat
) =>
    db.query(
        "Insert into customMeals(customMealName, calPer100, protien, carbs, fat)" +
            "Values(?,?,?,?,?)",
        [customMealName, calPer100, protien, carbs, fat]
    );
module.exports.getAllFood = () => query("Select * from food");
module.exports.addToLog = (foodID, calories, carbs, protien, fat, dateAdded) =>
    db.query(
        "insert into userDiet(foodID, calories, carbs, protien, fat, dateAdded)" +
            "Values(?,?,?,?,?,?)",
        [foodID, calories, carbs, protien, fat, dateAdded]
    );

module.exports.getUserDiet = (email) =>
    query("Select * from userDiet where userID = ?", [email]);
// dateAdded > DATE_SUB(NOW(), INTERVAL 1 DAY) and

module.exports.getFood = () => {
    const food = db.query("select * from food");
};
