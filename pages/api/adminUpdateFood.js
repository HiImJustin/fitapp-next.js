import prisma from "../../lib/prisma";

export default async function handle(req, res) {
    let food = req.body;

    try {
        let food = req.body;
        try {
            const result = await prisma.food.update({
                where: {
                    id: food.id,
                },
                data: {
                    foodName: food.foodName,
                    calPer100: parseInt(food.calPer100),
                    carbs: parseInt(food.carbs),
                    fat: parseInt(food.fat),
                    protien: parseInt(food.protien),
                },
            });
            res.status(201).json(result);
        } catch (error) {
            console.log("error in data sent");
            res.status(400).json(error);
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
