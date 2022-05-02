const db = require("../../../lib/db");
import handler from "../handler";
const userModel = require("../../../model/userModel");

export default handler.get(async (req, res) => {
    let email = req.query;
    userModel
        .getUsersByEmail(email.email)
        .then((results) => {
            if (results.length > 0) {
                console.log(results);
                res.status(200).json(results);
            } else {
                res.status(404).json("failed to find users");
            }
        })
        .catch((error) => {
            res.status(500).json("failed to fetch");
            console.log(error);
        });
});
