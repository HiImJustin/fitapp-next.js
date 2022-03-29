import { addExercise, getExercise } from "../model/exerciseModel";

const getExercises = (req, res) => {
    getExercise()
    .then((results) => {
        res.status(200).json(results)
    })
    .catch((error) => {
        console.log(error)
        res.json(500).json(error)
    })
}

const addExercises = (req, res) => {
    let exercise = req.body
    addExercise(
        exercise.exerciseName,
        exercise.avgCalBurned
    )
    .then((results) => {
        res.status(201).json(results)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json("couldnt add exercise")
    })
}

export { getExercises, addExercises }
