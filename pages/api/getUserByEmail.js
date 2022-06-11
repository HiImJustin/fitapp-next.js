import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
    try {
        const session = await getSession({ req });
        try {
            const result = await prisma.user.findUnique({
                where: {
                    email: session.user.email,
                },
                include: {
                    userDetails: true,
                },
            });
            res.status(201).json(result);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    } catch (error) {
        console.log("failed to fetch user session data " + error);
        res.status(500).json(error);
    }
}
