import nc from "next-connect";
import { getSession } from "next-auth/react";
import sendRequest from "../../middleware/limiter";
import prisma from "../../lib/prisma";
import { Temporal, Intl, toTemporalInstant } from "@js-temporal/polyfill";

const handler = nc({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
        res.status(404).end("Page is not found");
    },
}).use(async (req, res, next) => {
    await sendRequest();
    await checkLog(req, res);
    await addLog(req, res);
    console.log("yay");
    next();
});

export default handler;

const addLog = async (req, res) => {
    let action = req.method;
    const session = await getSession({ req });

    const forwarded = req.headers["x-forwarded-for"];
    const ip = forwarded
        ? forwarded.split(/, /)[0]
        : req.ip || req.connection.remoteAddress;

    prisma.activityLog
        .create({
            data: {
                user: session.user.email,
                action: action,
                ip: ip,
                user: session.user.email,
            },
        })
        .then((result) => {
            if (result) {
                console.log("new log created");
            } else {
                console.log(result);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json("failed to create log");
        });
};

const checkLog = async (req, res) => {
    const session = await getSession({ req });

    const results = await prisma.activityLog.findMany({
        where: {
            user: session.user.email,
        },
    });

    console.log("log checked");

    if (results.length > 500) {
        return res.status(400).json("Too many requests made");
    } else {
        console.log("request made");
    }
};
