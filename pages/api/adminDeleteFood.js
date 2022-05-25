import prisma from "../../lib/prisma";

export default async function handle(req, res) {
    let food = req.body;
    const result = await prisma.food.delete({
        where: {
            id: parseInt(food),
        },
    });
    res.status(201).json(result);
}
