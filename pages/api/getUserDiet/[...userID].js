// const db = require("../../../lib/db");
// import handler from "../handler";
// import { getUserDiet } from "../../../model/foodModel";

// export default handler.get(async (req, res) => {
//     getUserDiet(userID.userID)
//         .then((results) => {
//             if (results.length > 0) {
//                 console.log(results);
//                 res.status(200).json(results);
//             } else {
//                 res.status(404).json("failed to find userDiet");
//             }
//         })
//         .catch((error) => {
//             res.status(500).json("failed to fetch");
//             console.log(error);
//         });
// });
