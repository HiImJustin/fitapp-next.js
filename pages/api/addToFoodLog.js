import handler from "./handler";
import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";

// export default handler.post(async (req, res) => {
//     let food = req.body;

//     addToLog(
//         food.foodID,
//         food.calories,
//         food.carbs,
//         food.protien,
//         food.fat,
//         food.dateAdded,
//     )
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

export default handler.post(async (req, res) => {
    const session = await getSession({ req });

    let food = req.body;
    const result = await prisma.userDiet.create({
        data: {
            foodLogged: food.foodName,
            calories: parseInt(food.calories),
            carbs: parseInt(food.carbs),
            fat: parseInt(food.fat),
            protien: parseInt(food.protien),
            user: session.user.email,
            dateAdded: new Date(food.dateAdded),
            servingType: food.servingType,
            servingSize: food.servingSize,
        },
    });
    res.status(201).json(result);
});
