const db = require('../config/db')


module.exports.addFood = (foodName, caloriesPer100grams, protien, carbs, fat) => (
    db.query("Insert into food(foodName, caloriesPer100grams, protien, carbs, fat)"
    +"Values(?,?,?,?,?)", [foodName, caloriesPer100grams, protien, carbs, fat])
)
module.exports.addCustomMeal = (customMealName, caloriesPer100grams, protien, carbs, fat) => (
    db.query("Insert into customMeals(customMealName, caloriesPer100grams, protien, carbs, fat)"
    +"Values(?,?,?,?,?)", [customMealName, caloriesPer100grams, protien, carbs, fat])
)
module.exports.getAllFood = () => (
    db.query("Select * from food")
)