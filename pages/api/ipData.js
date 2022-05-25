import prisma from "../../lib/prisma";

export default async function handle(req, res) {
    let log = await req.body;
    console.log(log);
    const result = await prisma.allowdIps.create({
        data: {
            ip: log[0],
            allowed: log[1],
        },
    });
    res.status(201).json(result);
}
