import nc from "next-connect";
import { getSession } from "next-auth/react";
import sendRequest from "../../middleware/limiter";
import prisma from "../../lib/prisma";

const handler = nc({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
        res.status(404).end("Page is not found");
    },
}).use(async (req, res, next) => {
    // const session = await getSession({ req });
    // await sendRequest();
    // if (session) {
    //     await loggingModel
    //         .checkTotalRequests(session.user.email)
    //         .then((results) => {
    //             console.log(results.length + " out of 1000 per 24hrs");
    //             //If the total length of requests in a 24hour period is greater than 1000
    //             if (results.length >= 1000) {
    //                 console.log("stop spamming");
    //                 res.status(401).json("too many request, stop spamming me");
    //                 return;
    //             } else {
    //                 let action = req.method;
    //                 let request = 1;
    //                 console.log("out here");
    //                 const forwarded = req.headers["x-forwarded-for"];
    //                 const ip = forwarded
    //                     ? forwarded.split(/, /)[0]
    //                     : req.ip || req.connection.remoteAddress;
    //                 loggingModel.addNewLog(
    //                     session.user.email,
    //                     session.user.name,
    //                     action,
    //                     ip,
    //                     request
    //                 );
    //             }
    //             next();
    //         });
    // } else {
    //     console.log("no session");
    //     next();
    // }
    await addLog(req, res);
    await checkLog(req, res);
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
    console.log(results.length);
    if (results.length > 200) {
        return res.status(400).json("Too many requests made");
    } else {
        console.log("request made");
    }
};
