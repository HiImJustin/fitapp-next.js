// const userModel = require("../../model/userModel");
// const db = require("../../lib/db");
// import handler from "./handler";

// export default handler
//     .get(async (req, res) => {
//         userModel.getUsers().then((results) => {
//             if (results.length > 0) {
//                 console.log(results);
//                 res.status(200).json(results);
//             } else {
//                 res.status(404).json("failed to find users");
//             }
//         });
//     })
//     .post(async (req, res) => {
//         let login = req.body;
//         console.log(login);
//         userModel
//             .getUserByUsername(login.email)
//             .then((results) => {
//                 console.log(results[0]);
//                 if (results) {
//                     res.status(200).json(results[0]);
//                 } else {
//                     res.status(400).json("wrong username or password");
//                 }
//             })
//             .catch((error) => {
//                 console.log(error);
//                 res.status(500).json("failed to login, query error");
//             });
//     });
