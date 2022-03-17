import classes from "./routine.module.css"
import exercises from "./workoutData" 
import React from "react"
import {useRouter} from 'next/router'

export default function CreateRoutine() {

    const [exerciseOptions, setExercuseOptions] = React.useState() 

    function handleChange(e) {
        setExercuseOptions(e.target.value.toLowerCase())
    }
    
    const filter = exercises.filter(filter => filter.includes(exerciseOptions))
    const results = filter.map(exercise => <div key={exercise}>{exercise}</div>)
    console.log(results)
    //Manage what has been selected from the results variable
    const [selectedExercise, setSelectedExercise] = React.useState([])
    
    function selectExercise(e) {
        let selected = e.target.textContent
        setSelectedExercise(prevState => {
            return [...prevState, selected]
        })
        console.log(selected)
    }
    console.log(selectedExercise)

    let selectedExercisesElement = ""
    for(let i=0; i < selectedExercise.length; i++) {
        selectedExercisesElement = selectedExercise.map(data => 
            <p key={data}>
                {data}
            </p>
            )
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

    const router = useRouter()
    function submit(event) {
        event.preventDefault()
        router.push("/Home")
    }

    return (
        <>
        <form className={classes.routineBuilder}>
            <h2>Routine builder</h2>
            <label>Search Exercises</label>
            <input 
                type="text" 
                name="exercise" 
                onChange={handleChange}
            />
            <div onClick={selectExercise} className={classes.results}>{results}</div>

            {selectedExercise.length > 0 && 
            <div 
                className={classes.selectedExercise} 
                onClick={deleteExercise}>
                {selectedExercisesElement}
            </div>
            }
            <button onClick={submit}>Finish</button>
        </form>         
        </>
    )
}