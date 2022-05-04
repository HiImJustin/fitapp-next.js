import handler from "./handler";
import { getAllFood } from "../../model/foodModel";

export default handler.get(async (req, res) => {
    getAllFood()
        .then((results) => {
            if (results) {
                console.log(results);
                res.status(201).json(results);
            } else {
                res.status(400).json("couldnt find foods");
            }
        })
        .catch((errror) => {
            res.status(500).json(errror);
            console.log("query error");
        });
});
