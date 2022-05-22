import handler from "./handler";
import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";

export default handler.post(async (req, res) => {
    const session = await getSession({ req });

    let food = req.body;
    const result = await prisma.userDiet.delete({
        where: {
            id: food.foodID,
        },
    });
    res.status(201).json(result);
});
