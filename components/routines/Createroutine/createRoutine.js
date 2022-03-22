import classes from "./routine.module.css"
import exercises from "./workoutData" 
import React from "react"
import {useRouter} from 'next/router'

export default function CreateRoutine() {

    const [exerciseOptions, setExercuseOptions] = React.useState("") 
    function handleChange(e) {
        setExercuseOptions(e.target.value.toLowerCase())
    }
    
    const filter = exercises.filter(filter => filter.includes(exerciseOptions))
    const results = filter.map(exercise => <div key={exercise} onClick={selectExercise}>{exercise}</div>)

    //Manage what has been selected from the results variable
    const [selectedExercise, setSelectedExercise] = React.useState([])
    function selectExercise(e) {
        let selected = e.target.textContent
        setSelectedExercise(prevState => {
            return [...prevState, selected]
        })
    }

    function deleteExercise(e) {
        let selected = e.target.textContent
        if(selectedExercise.includes(selected)) {
            setSelectedExercise(prevState => {
                let remove = prevState.filter(exercise => exercise !== selected)
                return remove
            })
        }
    }
    let selectedExercisesElement = selectedExercise.map(data => 
            <p key={data} onClick={deleteExercise}>
                {data}
            </p>
        )


    const router = useRouter()
    function submit(event) {
        event.preventDefault()
        router.push("/Home")
    }

    return (
        <>
            <h2 className={classes.title}>Routine builder</h2>
            <form className={classes.routineBuilder}>
                <input 
                    type="text" 
                    name="exercise" 
                    placeholder="Search Exercises"
                    onChange={handleChange}
                />
                {exerciseOptions.length > 0 && results.length > 0 && 
                <div className={classes.results}>
                    {results}
                </div>}

                {selectedExercise.length > 0 && 
                <div 
                    className={classes.selectedExercise} >
                    {selectedExercisesElement}
                </div>
                }

            </form>         
            <button className={classes.addExercise} onClick={submit}>Save Routine</button>
        </>
    )
}