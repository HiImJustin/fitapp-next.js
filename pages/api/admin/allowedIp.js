import prisma from "../../../lib/prisma";

export default async (req, res) => {
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log(ip);
    const result = await prisma.allowdIps.findUnique({
        where: {
            ip: ip,
        },
    });
    if (result.allowed) {
        console.log("allowed");
        res.status(200).json(result);
    } else {
        return res.status(400).json("you are not an admin");
    }
};
