const db = require("../../lib/db");
import handler from "./handler";
import { createNewUser } from "../../model/userModel";

export default handler
    .get(async (req, res) => {
        db.query("Select * from userDetails")
            .then((results) => {
                if (results) {
                    console.log(results);
                    res.status(200).json(results);
                } else {
                    res.status(404).json("couldnt find user details");
                }
            })
            .catch((error) => {
                res.status(500).json(error);
                console.log("query error");
            });
    })
    .post(async (req, res) => {
        user = req.body;
        console.log(user);
        createNewUser(
            user.email, 
            user.password
        )
            .then((results) => {
                if (results) {
                    console.log(results);
                    res.status(201).json("user created!");
                } else {
                    res.status(400).json("couldnt create user");
                }
            })
            .catch((errror) => {
                res.status(500).json(errror);
                console.log("query error");
            });
    });
