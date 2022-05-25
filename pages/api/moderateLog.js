import prisma from "../../lib/prisma";

export default async function handle(req, res) {
    let log = await req.body;
    const result = await prisma[log].findMany({});
    res.status(201).json(result);
}
