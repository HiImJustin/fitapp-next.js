import handler from "./handler";
import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";

export default handler.post(async (req, res) => {
    const session = await getSession({ req });

    let user = req.body;
    const result = await prisma.userDetails.update({
        where: {
            userEmail: session.user.email,
        },
        data: {
            name: user.name,
            age: user.age,
            height: user.height,
            weight: user.weight,
            gender: user.sex,
            tdee: parseInt(user.tdee),
            bmr: parseInt(user.bmr),
            activity: user.activity,
        },
    });
    res.status(201).json(result);
});
