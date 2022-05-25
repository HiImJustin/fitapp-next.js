import prisma from "../../lib/prisma";

export default async function handle(req, res) {
    let log = await req.body;
    console.log(log);
    const result = await prisma.allowdIps.delete({
        where: {
            ip: log,
        },
    });
    res.status(200).json(result);
}
