import handler from "./handler";
import prisma from "../../lib/prisma";
import * as Yup from "yup";
import { getSession } from "next-auth/react";
import { Temporal, Intl, toTemporalInstant } from "@js-temporal/polyfill";

const now = Temporal.Now.plainDateTimeISO();
const oneDay = now.add({ days: -1 });
console.log(now);
console.log(oneDay.toString());

export default async function handle(req, res) {
    const session = await getSession({ req });

    const result = await prisma.userDiet.findMany({
        where: {
            user: session.user.email,
        },
        include: {
            userEmail: {
                include: { userDetails: true },
            },
        },
    });
    res.status(201).json(result);
}
