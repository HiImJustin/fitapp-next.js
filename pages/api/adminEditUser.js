import prisma from "../../lib/prisma";

export default async function handle(req, res) {
    let user = req.body;
    console.log(user);

    const result = await prisma.user.findUnique({
        where: {
            email: user,
        },
        include: {
            userDetails: true,
        },
    });
    res.status(201).json(result);
}
