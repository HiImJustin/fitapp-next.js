import classes from "./routine.module.css";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { query } from "../../../lib/db";
import { data } from "autoprefixer";

export async function getServerSideProps() {
    let exerciseDataProps = await query("select * from exercises");
    return { props: { exerciseDataProps } };
}

export default function CreateRoutine({ exerciseDataProps }) {
    const exerciseData = exerciseDataProps;

    const [exerciseOptions, setExerciseOptions] = React.useState("");
    function handleChange(e) {
        setExerciseOptions(e.target.value.toLowerCase());
    }

    function filterItems(exerciseName) {
        return exerciseData.filter((exercise) =>
            exercise.exerciseName.toLowerCase().includes(exerciseName)
        );
    }

    const filtered = filterItems(exerciseOptions);
    const results = filtered.map((exercise) => (
        <div key={exercise.exerciseID} onClick={selectExercise}>
            {exercise.exerciseName}
        </div>
    ));

    //Manage what has been selected from the results variable
    const [selectedExercise, setSelectedExercise] = React.useState([]);
    function selectExercise(e) {
        let selected = e.target.textContent;
        setSelectedExercise((prevState) => {
            return [...prevState, selected];
        });
    }
    console.log(selectedExercise);

    function deleteExercise(e) {
        let selected = e.target.textContent;
        if (selectedExercise.includes(selected)) {
            setSelectedExercise((prevState) => {
                let remove = prevState.filter(
                    (exercise) => exercise !== selected
                );
                return remove;
            });
        }
    }
    let selectedExercisesElement = selectedExercise.map((data, i) => (
        <p key={i} onClick={deleteExercise}>
            {data}
        </p>
    ));

    const router = useRouter();
    function submit(e) {
        e.preventDefault();
        router.push("/Home");
    }

    const [modal, setModal] = React.useState(false);

    const addCustomExercise = (e) => {
        console.log("hello");
        e.preventDefault();
        setModal((prevState) => !prevState);
    };

    const exerciseStyle = {
        width: "100%",
        height: "100%",
    };

    const CustomExerciseModal = () => {
        const [formValues, setFormValues] = React.useState({
            exerciseName: "",
            avgCalBurned: "",
        });

        function handleFormData(e) {
            const { name, value, type, checked } = e.target;
            setFormValues((prevState) => {
                return {
                    ...prevState,
                    [name]: type === "checkbox" ? checked : value,
                };
            });
        }
        const submitExerciseData = async (event) => {
            event.preventDefault();
            const response = await fetch("/api/exercisesApi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues),
            });
            const data = await response.json();
            console.log(data);
        };

        return (
            <div style={exerciseStyle}>
                <input
                    type="text"
                    name="exerciseName"
                    placeholder="Exercise Name"
                    value={formValues.exerciseName}
                    onChange={handleFormData}
                />
                <input
                    type="text"
                    name="avgCalBurned"
                    placeholder="Avg calories burned"
                    value={formValues.avgCalBurned}
                    onChange={handleFormData}
                />
                <button onClick={submitExerciseData}>Add new exercise</button>
            </div>
        );
    };

    return (
        <>
            <h2 className={classes.title}>Routine builder</h2>
            <form className={classes.routineBuilder}>
                <input
                    type="text"
                    name="exercise"
                    placeholder="Search Exercises"
                    onChange={handleChange}
                    autoComplete="off"
                />
                {exerciseOptions.length > 0 && results.length > 0 && (
                    <div className={classes.results}>
                        {results}
                        <button
                            className={classes.addNewExercise}
                            onClick={addCustomExercise}
                        >
                            Add custom exercise
                        </button>
                    </div>
                )}

                {selectedExercise.length > 0 && (
                    <div className={classes.selectedExercise}>
                        {selectedExercisesElement}
                    </div>
                )}
                {modal && <CustomExerciseModal />}
            </form>
            <button className={classes.addExercise} onClick={submit}>
                Save Routine
            </button>
        </>
    );
}
