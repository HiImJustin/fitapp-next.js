import prisma from "../../lib/prisma";

export default async function handle(req, res) {
    const result = await prisma.food.findMany({});
    res.status(201).json(result);
}
