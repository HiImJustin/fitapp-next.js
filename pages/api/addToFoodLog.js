import { addToLog } from "../../model/foodModel";
import handler from "./handler";
import prisma from "../../lib/prisma";
import { stringify } from "postcss";

// export default handler.post(async (req, res) => {
//     let food = req.body;

//     prisma.userDiet
//         .create({
//             data: {
//                 foodLogged: food.foodID,
//                 calories: food.calories,
//                 protien: food.carbs,
//                 carbs: food.protien,
//                 fat: food.fat,
//             },
//         })
//         .then((results) => {
//             if (results.affectedRows > 0) {
//                 console.log(results);
//                 res.status(201).json(results);
//             } else {
//                 res.status(400).json("could not add to foodlog");
//             }
//         })
//         .catch((error) => {
//             res.status(500).json(error);
//             console.log(error);
//         });
// });

export default async function handle(req, res) {
    let food = req.body;

    const result = await prisma.userDiet.create({
        data: {
            foodLogged: food.foodName,
            calories: parseInt(food.calories),
            protien: parseInt(food.carbs),
            carbs: parseInt(food.protien),
            fat: parseInt(food.fat),
        },
    });
    res.json(result);
}
// export default async function handle(req, res) {
//     let food = req.body;

//     prisma.userDiet
//         .create({
//             data: {
//                 foodLogged: String(food.foodID),
//                 calories: parseInt(food.calories),
//                 protien: parseInt(food.carbs),
//                 carbs: parseInt(food.protien),
//                 fat: parseInt(food.fat),
//             },
//         })
//         .then((results) => {
//             // if (results.affectedRows > 0) {
//             console.log(results);
//             res.status(201).json(results);
//             // } else {
//             //     res.status(400).json("could not add to foodlog");
//             // }
//         })
//         .catch((error) => {
//             res.status(500).json(error);
//             console.log(error);
//         });
// }
