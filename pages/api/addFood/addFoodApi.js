const db = require('../../../config/db')
import { addFood, getAllFood } from '../../../model/foodModel'
import handler from '../handler'

export default handler
.get(async(req, res) => {
    getAllFood()
    .then((results) => {
        if(results.length > 0) {
            res.status(200).json(results)
        } else {
            res.status(404).json('exercises not found')
        }
    })
    .catch((error) => {
        console.log(error)
        res.json(500).json(error)
    })
})
.post(async(req, res) => {

        let food = req.body;
        
        addFood(
            food.foodName, 
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