import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async (req, res) => {
    const session = await getSession({ req });

    if (session) {
        const result = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
        });
        if (result.admin) {
            res.status(200).json(result);
        } else {
            res.status(400).json("You are not an admin");
        }
    } else {
        res.send({
            error: "you need to be an admin",
        });
    }
};
