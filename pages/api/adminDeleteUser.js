import prisma from "../../lib/prisma";

export default async function handle(req, res) {
    let user = await req.body;
    console.log(user);

    const deleteUser = await prisma.user.deleteMany({
        where: {
            email: user,
        },
    });
    res.status(200).json(deleteUser);
}
