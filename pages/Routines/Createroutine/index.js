import classes from "./routine.module.css";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { query } from "../../../lib/db";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { BounceLoader } from "react-spinners";
toast.configure();

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

    //Render this when add custom exercise is clicked
    const CustomExerciseModal = () => {
        //
        const validateFields = Yup.object().shape({
            exerciseName: Yup.string()
                .required("The name field cannot be blank")
                .min(2, "Please choose a name more than 1 character")
                .max(30, "Please choose a name with less than 30 characters"),
            avgCalBurned: Yup.number()
                .min(1, "Please set a value between 1 and 10,000")
                .max(10000, "Please choose a value less than 10,000"),
        });
        let formik = useFormik({
            initialValues: {
                exerciseName: "",
                avgCalBurned: "",
            },
            validationSchema: validateFields,
            onSubmit: (values) => {
                alert("form submitted");
            },
        });
        const [loading, setLoading] = React.useState(false);
        const submitExerciseData = async (event) => {
            event.preventDefault();
            setLoading(true);
            const response = await fetch("/api/exercisesApi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formik.values),
            });
            const data = await response.json();
            if (response.ok) {
                notify();
            } else {
                return;
            }
            setLoading(false);
            console.log(data);
            setModal(false);
        };

        function notify() {
            toast(formik.values.exerciseName + " added to log", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000,
                pauseOnHover: false,
            });
        }

        return (
            <div style={exerciseStyle}>
                <h1>
                    Add new exercise here!
                    <button
                        onClick={() => {
                            setModal(false);
                        }}
                    >
                        Cancel
                    </button>
                </h1>
                <input
                    type="text"
                    name="exerciseName"
                    placeholder="Exercise Name"
                    value={formik.values.exerciseName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {formik.errors.exerciseName && formik.touched.exerciseName ? (
                    <p className="text-red-600">{formik.errors.exerciseName}</p>
                ) : null}

                <input
                    className="mt-20"
                    type="number"
                    name="avgCalBurned"
                    placeholder="Avg calories burned"
                    value={formik.values.avgCalBurned}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.avgCalBurned && formik.touched.avgCalBurned ? (
                    <p className="text-red-600">{formik.errors.avgCalBurned}</p>
                ) : null}

                <button
                    className={`${classes.addExercise} mx-auto mt-2`}
                    onClick={submitExerciseData}
                    disabled={!formik.isValid}
                >
                    Add new exercise
                </button>
                <BounceLoader loading={loading} />
            </div>
        );
    };

    return (
        <>
            <h2 className={classes.title}>Routine builder</h2>
            <form className={classes.routineBuilder}>
                {!modal && (
                    <input
                        type="text"
                        name="exercise"
                        placeholder="Search Exercises"
                        onChange={handleChange}
                        autoComplete="off"
                    />
                )}
                {exerciseOptions.length >= 1 && results.length > 0 && !modal && (
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
