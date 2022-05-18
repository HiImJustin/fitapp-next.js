import handler from "./handler";
import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";

export default handler.post(async (req, res) => {
    const session = await getSession({ req });

    let user = req.body;
    const result = await prisma.userDetails.create({
        data: {
            name: user.name,
            age: user.age,
            height: user.height,
            weight: user.weight,
            gender: user.sex,
            tdee: user.tdee,
            bmr: user.bmr,
            activity: user.activity,
            userEmail: session.user.email,
        },
    });
    res.status(201).json(result);
});
