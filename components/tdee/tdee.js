import React, { useEffect } from "react";
import classes from "./tdee.module.css";

//Function for calculating Total Daily Energy Expenditure
export default function TDEE(props) {
    //BMR (kcal / day) = 10 * weight (kg) + 6.25 * height (cm) – 5 * age (y) + s (kcal / day),
    // where s is +5 for males and -161 for females.
    // Options of those measurments not made yet
    // function weightHeightConversion(pounds, inches, feet) {
    //     weight = (pounds / 2.2).toFixed(2);
    //     heightToCm = ((inches / 12) + feet);
    //     height = (heightToCm * 30.48);
    // }

    //Convert this into state
    const [formValues, setFormValues] = React.useState({
        name: "",
        age: "",
        height: "",
        weight: "",
        sex: "",
        activity: "",
    });

    function handleFormData(e) {
        const { name, value } = e.target;
        setFormValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    //Sort through state to find out what was selected
    function calculateTDEE(bmr) {
        if (formValues.activity === "sedentary") {
            results.tdee = Math.round(bmr * 1.2);
        } else if (formValues.activity === "Light") {
            results.tdee = Math.round(bmr * 1.375);
        } else if (formValues.activity === "Moderate") {
            results.tdee = Math.round(bmr * 1.55);
        } else if (formValues.activity === "High") {
            results.tdee = Math.round(bmr * 1.725);
            console.log("High");
        } else if (formValues.activity === "Extreemly Active") {
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

    function calculateBMR(event) {
        event.preventDefault();

        if (formValues.sex === "female") {
            let femaleBmr = 10 * formValues.weight + 6.25 * formValues.height;
            let bmr = femaleBmr - 5 * formValues.age;
            bmr = Math.round(bmr);

            calculateTDEE(bmr);
            showResults(bmr, results.tdee);
        } else {
            let maleBmr = 10 * formValues.weight + 6.25 * formValues.height;
            bmr = maleBmr + 5 * formValues.age;
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
    });
    console.log(submitData);

    useEffect(() => {
        setSubmitData((prevState) => ({
            ...prevState,
            tdee: results.tdee,
            bmr: results.bmr,
            name: formValues.name,
            age: formValues.age,
            height: formValues.height,
            weight: formValues.weight,
            sex: formValues.sex,
            activity: formValues.activity,
        }));
    }, [formValues, results]);

    const submitUserData = async (event) => {
        event.preventDefault();
        const response = await fetch("/api/registerApi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submitData),
        });
        // console.log(response)
        const data = await response.json();
        console.log(data);
    };

    return (
        <>
            <form className={classes.detailsForm}>
                <h2>Personal Information</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formValues.name}
                    onChange={handleFormData}
                />
                <input
                    type="text"
                    name="age"
                    placeholder="Age"
                    value={formValues.age}
                    onChange={handleFormData}
                />
                <input
                    type="text"
                    name="height"
                    placeholder="Height"
                    value={formValues.height}
                    onChange={handleFormData}
                />
                <input
                    type="text"
                    name="weight"
                    placeholder="Weight"
                    value={formValues.weight}
                    onChange={handleFormData}
                />
                <select name="sex" onChange={handleFormData}>
                    {formValues.sex === "" && (
                        <option value="">Select Sex</option>
                    )}
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <select name="activity" onChange={handleFormData}>
                    {formValues.activity === "" && (
                        <option value="">Select Activity Level</option>
                    )}
                    <option value="Extreemly Active">Extreemly Active</option>
                    <option value="High">High</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Light">Light</option>
                    <option value="sedentary">sedentary</option>
                </select>
                <button onClick={calculateBMR}>Calculate</button>

                <section className={classes.results}>
                    <p>Base Metabolic Rate: {results.bmr} Cals</p>
                    <p>Total Daily Energy Expenditure: {results.tdee} Cals</p>
                    <p>To Lose half a Kg a week: {results.loseHalfKg} Cals</p>
                    <p>To Lose one Kg a week: {results.loseKg} Cals</p>
                    <p>To Gain half a Kg a week: {results.gainHalfKg} Cals</p>
                    <p>To maintain: {results.maintain} Cals</p>
                </section>
                <button className={classes.button} onClick={submitUserData}>
                    Finsh Registration
                </button>
            </form>
        </>
    );
}
