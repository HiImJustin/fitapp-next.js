import prisma from "../../lib/prisma";
import { userSchema } from "../../middleware/validator";

export default async function handle(req, res) {
    try {
        let user = await userSchema.validate(req.body);

        try {
            const result = await prisma.user.update({
                where: {
                    email: user.email,
                },
                data: {
                    email: user.email,
                    name: user.name,
                    admin: user.userType === "true",
                },
            });
            console.log("here");
            res.status(200).json(result);
        } catch (error) {
            console.log("there");
            res.status(400).json(error);
        }
    } catch (error) {
        console.log("here");
        return res.status(400).json({ message: error.message });
    }
}
