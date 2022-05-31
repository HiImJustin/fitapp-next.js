import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
    const session = await getSession({ req });

    const deleteUser = await prisma.user.deleteMany({
        where: {
            email: session.user.email,
        },
    });
    res.status(200).json(deleteUser);
}
