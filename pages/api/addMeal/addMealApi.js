const db = require('../../../config/db')
import handler from '../handler'
import { addCustomMeal } from '../../../model/foodModel'

export default handler
.post(async(req, res) => {

        let food = req.body;
        
        addCustomMeal(
            food.customMealName, 
            food.caloriesPer100grams, 
            food.protien, 
            food.carbs, 
            food.fat
        )
        .then((results) => {
            if(results.affectedRows > 0) {
                console.log(results)
                res.status(201).json(results)
            } else {
                res.status(404).json("couldnt add meal")
            }
        }).catch((error) => {
            res.status(500).json(error)
            console.log('query error')
        })
})