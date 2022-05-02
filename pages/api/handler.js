import nc from "next-connect";
import { getSession } from "next-auth/react";
const loggingModel = require("../../model/loggingModel");
import sendRequest from "../../middleware/limiter";

const handler = nc({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
        res.status(404).end("Page is not found");
    },
}).use(async (req, res, next) => {
    const session = await getSession({ req });

    // await sendRequest();

    if (session) {
        await loggingModel
            .checkTotalRequests(session.user.email)
            .then((results) => {
                console.log(results.length + " out of 1000 per 24hrs");
                //If the total length of requests in a 24hour period is greater than 1000
                if (results.length >= 1000) {
                    console.log("stop spamming");
                    res.status(401).json("too many request, stop spamming me");
                    return;
                } else {
                    let action = req.method;
                    let request = 1;
                    console.log("out here");
                    const forwarded = req.headers["x-forwarded-for"];
                    const ip = forwarded
                        ? forwarded.split(/, /)[0]
                        : req.ip || req.connection.remoteAddress;

                    loggingModel.addNewLog(
                        session.user.email,
                        session.user.name,
                        action,
                        ip,
                        request
                    );
                }
                next();
            });
    } else {
        console.log("no session");
        next();
    }
});

export default handler;
