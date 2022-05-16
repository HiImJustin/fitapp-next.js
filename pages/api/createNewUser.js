// import handler from "./handler";
// import { createNewUser } from "../../model/userModel";

// export default handler.post(async (req, res) => {
//     let user = req.body;
//     console.log(user);
//     createNewUser(user.email, user.password)
//         .then((results) => {
//             if (results) {
//                 console.log(results);
//                 res.status(201).json(results);
//             } else {
//                 res.status(400).json("couldnt create user");
//             }
//         })
//         .catch((errror) => {
//             res.status(500).json(errror);
//             console.log("query error");
//         });
// });
