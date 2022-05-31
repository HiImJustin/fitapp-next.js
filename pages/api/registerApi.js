import handler from "./handler";
import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";
import { registerSchema } from "../../middleware/validator";

export default handler.post(async (req, res) => {
    try {
        const session = await getSession({ req });
        let user = await registerSchema.validate(req.body);
        try {
            const result = await prisma.userDetails.create({
                data: {
                    name: user.name,
                    age: user.age,
                    weight: user.weight,
                    height: user.height,
                    gender: user.sex,
                    activity: user.activity,
                    tdee: Math.round(user.tdee),
                    bmr: Math.round(user.bmr),
                    userEmail: session.user.email,
                },
            });
            res.status(201).json(result);
        } catch (error) {
            console.log("userDetails couldnt be created");
            res.status(400).json(error.message);
        }
    } catch (error) {
        console.log("data isnt valid");
        return res.status(400).json({ message: error.message });
    }
});
