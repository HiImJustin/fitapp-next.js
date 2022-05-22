import handler from "./handler";
import prisma from "../../lib/prisma";
import { getSession } from "next-auth/react";

// export default handler.post(async (req, res) => {
//     const session = await getSession({ req });

//     const deleteUser = await prisma.user.deleteMany({
//         where: {
//             email: session.user.email,
//         },
//     });
//     res.status(200).json(deleteUser);
//     // const deleteAccount = await prisma.user.findUnique({
//     //     where: {
//     //         email: session.user.email,
//     //     },
//     //     include: {
//     //         account: true,
//     //         session: true,
//     //         activityLog: true,
//     //         userDiet: true,
//     //         userDetails: true,
//     //         userDetails: {
//     //             select: {
//     //                 customMeals: true,
//     //             },
//     //         },
//     //     },
//     // });
//     // const results = deleteAccount;

//     // const deleteUserAcount = await prisma.account.deleteMany({
//     //     where: {
//     //         account: results.user.id,
//     //     },
//     // });

//     // const deleteSession = await prisma.session.deleteMany({
//     //     where: {
//     //         userId: result.user.id,
//     //     },
//     // });

//     // const deleteActivityLog = await prisma.activityLog.deleteMany({
//     //     where: {
//     //         email: session.user.email,
//     //     },
//     // });
//     // res.status(201).json(result);
//     // const result = await prisma.user.deleteMany({
//     //     where: {
//     //         email: session.user.email,
//     //     },
//     // });
//     // res.status(201).json(result);
// });

export default async function handle(req, res) {
    const session = await getSession({ req });

    const deleteUser = await prisma.user.deleteMany({
        where: {
            email: session.user.email,
        },
    });
    res.status(200).json(deleteUser);
}
