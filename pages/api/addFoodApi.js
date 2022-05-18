import handler from "./handler";
import prisma from "../../lib/prisma";
import * as Yup from "yup";

export default handler.post(async (req, res) => {
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
});
