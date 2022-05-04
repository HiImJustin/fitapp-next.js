import { addToLog } from "../../model/foodModel";
import handler from "./handler";

export default handler.post(async (req, res) => {
    let food = req.body;

    addToLog(
        food.foodID,
        food.calories,
        food.carbs,
        food.protien,
        food.fat,
        food.dateAdded,
    )
        .then((results) => {
            if (results.affectedRows > 0) {
                console.log(results);
                res.status(201).json(results);
            } else {
                res.status(400).json("could not add to foodlog");
            }
        })
        .catch((error) => {
            res.status(500).json(error);
            console.log(error);
        });
});
