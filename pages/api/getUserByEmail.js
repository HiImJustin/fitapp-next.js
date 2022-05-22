import handler from "./handler";
import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
    const session = await getSession({ req });

    const result = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
        include: {
            userDetails: true,
        },
    });
    res.status(201).json(result);
}
