import prisma from "../../lib/prisma";

export default async function handle(req, res) {
    try {
        let food = req.body;
        const result = await prisma.food.delete({
            where: {
                id: parseInt(food),
            },
        });
        res.status(201).json(result);
    } catch (error) {
        console.log("error in data sent " + error);
        res.status(400).json(error);
    }
}
