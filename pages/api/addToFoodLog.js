import handler from "./handler";
import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";
import { foodLogSchema } from "../../middleware/validator";

export default handler.post(async (req, res) => {
    const session = await getSession({ req });
    try {
        let food = await foodLogSchema.validate(req.body);
        console.log(food);
        try {
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
        } catch (error) {
            console.log("error in data sent " + error);
            res.status(400).json(error);
        }
    } catch (error) {
        console.log("error in form validation " + error);
        res.status(400).json(error);
    }
});
