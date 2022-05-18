import React, { useEffect } from "react";
import classes from "./tdee.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PacmanLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState } from "react";
toast.configure();

//Function for calculating Total Daily Energy Expenditure
export default function TDEE({ name, value }) {
    //BMR (kcal / day) = 10 * weight (kg) + 6.25 * height (cm) – 5 * age (y) + s (kcal / day),
    // where s is +5 for males and -161 for females.
    // Options of those measurments not made yet
    // function weightHeightConversion(pounds, inches, feet) {
    //     weight = (pounds / 2.2).toFixed(2);
    //     heightToCm = ((inches / 12) + feet);
    //     height = (heightToCm * 30.48);
    // }
    function notify() {
        toast("Welcome to FIT " + submitData.name, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            pauseOnHover: false,
        });
    }
    const router = useRouter();
    let [loading, setLoading] = useState(false);

    const validateFields = Yup.object().shape({
        name: Yup.string()
            .required("The name field cannot be blank")
            .max(30, "Please choose a name with less than 30 characters"),
        age: Yup.number()
            .min(
                1,
                "its reccomended to be older than 1 year old to track calories"
            )
            .max(200, "Please choose age under 200")
            .required("The age field cannot be blank"),
        weight: Yup.number()
            .required("The weight field cannot be blank")
            .min(1, "please weight something")
            .max(
                700,
                "you dont weigh more than 700kgs, if you do contact someone to claim a world record"
            ),
        height: Yup.number()
            .positive()
            .required("The Height field cannot be blank")
            .min(50, "Please choose a heigh more than 50cm")
            .max(300, "Please choose a heigh less than 300cm"),
        sex: Yup.string().required("The sex field cannot be blank"),
        activity: Yup.string().required("The activity field cannot be blank"),
    });
    let formik = useFormik({
        initialValues: {
            name: "",
            age: "",
            height: "",
            weight: "",
            sex: "",
            activity: "",
        },
        validationSchema: validateFields,
        onSubmit: (values) => {
            alert("form submitted");
        },
    });

    function calculateTDEE(bmr) {
        if (formik.values.activity === "sedentary") {
            results.tdee = Math.round(bmr * 1.2);
        } else if (formik.values.activity === "Light") {
            results.tdee = Math.round(bmr * 1.375);
        } else if (formik.values.activity === "Moderate") {
            results.tdee = Math.round(bmr * 1.55);
        } else if (formik.values.activity === "High") {
            results.tdee = Math.round(bmr * 1.725);
            console.log("High");
        } else if (formik.values.activity === "Extreemly Active") {
            results.tdee = Math.round(bmr * 1.9);
            console.log("Extreemly Active");
        }
    }

    // Create state to return the results
    const [results, setResults] = React.useState({
        bmr: "",
        tdee: "",
        loseHalfKg: "",
        loseKg: "",
        gainHalfKg: "",
        maintain: "",
    });

    function showResults(bmr, tdee) {
        setResults((prevState) => ({
            ...prevState,
            tdee: tdee,
            bmr: bmr,
            loseHalfKg: tdee - 500,
            loseKg: tdee - 1000,
            gainHalfKg: tdee + 500,
            maintain: tdee,
        }));
    }

    function calculateBMR(e) {
        e.preventDefault();

        if (formik.values.sex === "female") {
            let femaleBmr =
                10 * formik.values.weight + 6.25 * formik.values.height;
            let bmr = femaleBmr - 5 * formValues.age;
            bmr = Math.round(bmr);

            calculateTDEE(bmr);
            showResults(bmr, results.tdee);
        } else {
            let maleBmr =
                10 * formik.values.weight + 6.25 * formik.values.height;
            bmr = maleBmr + 5 * formik.values.age;
            bmr + Math.round(bmr);

            calculateTDEE(bmr);
            showResults(bmr, results.tdee);
        }
    }

    const [submitData, setSubmitData] = React.useState({
        tdee: "",
        bmr: "",
        name: "",
        age: "",
        height: "",
        weight: "",
        sex: "",
        activity: "",
        email: "",
    });

    useEffect(() => {
        setSubmitData((prevState) => ({
            ...prevState,
            tdee: results.tdee,
            bmr: results.bmr,
            name: formik.values.name,
            age: formik.values.age,
            height: formik.values.height,
            weight: formik.values.weight,
            sex: formik.values.sex,
            activity: formik.values.activity,
        }));
    }, [results]);
    console.log(submitData);

    const submitUserData = async (event) => {
        event.preventDefault();
        setLoading(true);
        const response = await fetch("/api/registerApi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submitData),
        });
        // console.log(response)
        const data = await response.json();
        notify();
        console.log(data);
        setLoading(false);
        router.push("/signin");
    };

    return (
        <>
            <form className={classes.detailsForm}>
                <h2>Personal Information</h2>
                <input type="hidden" name={name} value={value} />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {formik.errors.name && formik.touched.name ? (
                    <p className="text-red-600">{formik.errors.name}</p>
                ) : null}
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formik.values.age}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {formik.errors.age && formik.touched.age ? (
                    <p className="text-red-600">{formik.errors.age}</p>
                ) : null}

                <input
                    type="number"
                    name="height"
                    placeholder="Height"
                    value={formik.values.height}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {formik.errors.height && formik.touched.height ? (
                    <p className="text-red-600">{formik.errors.height}</p>
                ) : null}
                <input
                    type="number"
                    name="weight"
                    placeholder="Weight"
                    onBlur={formik.handleBlur}
                    value={formik.values.weight}
                    onChange={formik.handleChange}
                />
                {formik.errors.weight && formik.touched.weight ? (
                    <p className="text-red-600">{formik.errors.weight}</p>
                ) : null}

                <PacmanLoader loading={loading} />

                <select
                    name="sex"
                    onChange={formik.handleChange}
                    value={formik.values.sex}
                    onBlur={formik.handleBlur}
                >
                    <option value="">Select Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                {formik.errors.sex && formik.touched.sex ? (
                    <p className="text-red-600">{formik.errors.sex}</p>
                ) : null}

                <select
                    name="activity"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <option value="">Select Activity Level</option>
                    <option value="Extreemly Active">Extreemly Active</option>
                    <option value="High">High</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Light">Light</option>
                    <option value="sedentary">sedentary</option>
                </select>
                {formik.errors.activity && formik.touched.activity ? (
                    <p className="text-red-600">{formik.errors.activity}</p>
                ) : null}

                <button className="dark:bg-[#3b3b3b]" onClick={calculateBMR}>
                    Calculate
                </button>

                <section className={classes.results}>
                    <p>Base Metabolic Rate: {results.bmr} Cals</p>
                    <p>Total Daily Energy Expenditure: {results.tdee} Cals</p>
                    <p>To Lose half a Kg a week: {results.loseHalfKg} Cals</p>
                    <p>To Lose one Kg a week: {results.loseKg} Cals</p>
                    <p>To Gain half a Kg a week: {results.gainHalfKg} Cals</p>
                    <p>To maintain: {results.maintain} Cals</p>
                </section>
                <button
                    className={`${classes.button} dark:bg-[#3b3b3b]`}
                    disabled={
                        !formik.isValid ||
                        formik.values.name === "" ||
                        results.tdee === ""
                    }
                    onClick={submitUserData}
                >
                    Finsh Registration
                </button>
            </form>
        </>
    );
}
