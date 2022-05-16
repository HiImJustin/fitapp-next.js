// import handler from "./handler";
// const exerciseModel = require("../../model/exerciseModel");

// export default handler
//     .get(async (req, res) => {
//         exerciseModel
//             .getExercise()
//             .then((results) => {
//                 if (results.length > 0) {
//                     res.status(200).json(results);
//                 } else {
//                     res.status(404).json("exercises not found");
//                 }
//             })
//             .catch((error) => {
//                 console.log(error);
//                 res.json(500).json(error);
//             });
//     })
//     .post(async (req, res) => {
//         let exercise = req.body;
//         exerciseModel
//             .addExercise(exercise.exerciseName, exercise.avgCalBurned)
//             .then((results) => {
//                 if (results.affectedRows > 0) {
//                     res.status(201).json(results);
//                 } else {
//                     res.status(404).jons("cannot add exercise");
//                 }
//             })
//             .catch((error) => {
//                 console.log(error);
//                 res.status(500).json("couldnt add exercise");
//             });
//     });
