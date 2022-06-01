import prisma from "../../../lib/prisma";

export default async (req, res) => {
    try {
        let ip =
            (await req.headers["x-forwarded-for"]) || req.socket.remoteAddress;
        console.log(ip);
        try {
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
        } catch (error) {
            console.log("error in data");
            res.status(400).json(error);
        }
    } catch (error) {
        console.log("error getting ip");
        res.status(500).json(error);
    }
};
