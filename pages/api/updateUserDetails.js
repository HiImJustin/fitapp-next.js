import handler from "./handler";
import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";
import { registerSchema } from "../../middleware/validator";

export default handler.post(async (req, res) => {
    const session = await getSession({ req });
    try {
        let user = registerSchema.validate(req.body);
        try {
            const result = await prisma.userDetails.update({
                where: {
                    userEmail: session.user.email,
                },
                data: {
                    name: user.name,
                    age: user.age,
                    weight: user.weight,
                    height: user.height,
                    gender: user.sex,
                    activity: user.activity,
                    tdee: parseInt(user.tdee),
                    bmr: parseInt(user.bmr),
                },
            });
            res.status(201).json(result);
        } catch (error) {
            console.log("query error");
            res.status(403).json(error.message);
        }
    } catch (error) {
        console.log("validation error");
        res.status(400).json(error.message);
    }
});
