import handler from "./handler";
import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";

export default handler.post(async (req, res) => {
    const session = await getSession({ req });

    let food =  await req.body;
    const result = await prisma.userDiet.update({
        where: {
            id: food.foodID,
        },
        data: {
            foodLogged: food.foodName,
            calories: parseInt(food.calories),
            carbs: parseInt(food.carbs),
            fat: parseInt(food.fat),
            protien: parseInt(food.protien),
            user: session.user.email,
            dateAdded: new Date(food.dateAdded),
            servingType: food.servingType,
            servingSize: parseInt(food.servingSize),
        },
    });
    res.status(201).json(result);
});
