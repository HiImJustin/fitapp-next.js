import handler from "./handler";
import prisma from "../../lib/prisma";
import * as Yup from "yup";

// export default handler
//     .get(async (req, res) => {
//         getAllFood()
//             .then((results) => {
//                 if (results.length > 0) {
//                     res.status(200).json(results);
//                 } else {
//                     res.status(404).json("food not found");
//                 }
//             })
//             .catch((error) => {
//                 console.log(error);
//                 res.json(500).json(error);
//             });
//     })
//     .post(async (req, res) => {
//         const { foodName, calPer100, protien, carbs, fat } = req.body;
//         console.log(foodName);
//         const result = await prisma.food.create({
//             data: {
//                 foodName: foodName,
//                 calPer100: calPer100,
//                 protien: protien,
//                 carbs: carbs,
//                 fat: fat,
//             },
//         });
//         res.json(result);
//     });
//     foodModel
//         .addFood(
//             food.foodName,
//             food.calPer100,
//             food.protien,
//             food.carbs,
//             food.fat
//         )
//         .then((results) => {
//             if (results.affectedRows > 0) {
//                 console.log(results);
//                 res.status(201).json(results);
//             } else {
//                 res.status(404).json("couldnt add food");
//             }
//         })
//         .catch((error) => {
//             res.status(500).json(error);
//             console.log(error);
//         });
// });

export default handler.post(async (req, res) => {
    // export default async function handle(req, res) {
    // const { foodName, calPer100, protien, carbs, fat } = req.body;
    let food = req.body;
    const result = await prisma.food.create({
        data: {
            foodName: food.foodName,
            calPer100: parseInt(food.calPer100),
            carbs: parseInt(food.carbs),
            fat: parseInt(food.fat),
            protien: parseInt(food.protien),
        },
    });
    res.status(201).json(result);
    // }
});
