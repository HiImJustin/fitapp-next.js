const db = require("../../lib/db");
import handler from "./handler";

export default handler.get(async (req, res) => {
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
});
