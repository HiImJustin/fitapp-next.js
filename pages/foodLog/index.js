import classes from "./foodlog.module.css";
import React, { useEffect } from "react";
const url = process.env.NEXT_PUBLIC_API_URL;
import { Temporal, Intl, toTemporalInstant } from "@js-temporal/polyfill";
import Button from "@mui/material/Button";
import {
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/react";
import { ToastContainer, toast } from "react-toastify";
toast.configure();

export default function FoodLog({}) {
    const [openModal, setOpenModal] = React.useState(false);

    //State for all of the user food that they have logged
    const [userDiet, setUserDiet] = React.useState([]);
    //Fetches all the data
    useEffect(() => {
        fetch(`${url}/getUserDiet`)
            .then((res) => res.json())
            .then((food) => {
                setUserDiet((prevState) => food);
                setLoading(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [openModal]);

    const now = Temporal.Now.plainDateISO();
    const [date, setDate] = React.useState(now);

    //Function to filter the items in state based on the current date and the date
    //That the users logged the food on
    function filterItems(date) {
        return userDiet.filter((food) =>
            food.dateAdded.toString().includes(date.toString())
        );
    }
    //THIS HERE CONTAINS THE CURRENT FILTERED FOOD ITEMS
    const filtered = filterItems(date.toString());

    //Create loading state to trigger the use effect below
    const [loading, setLoading] = React.useState(false);

    //This calls a function below to calculate all the values from the filtered array
    //And then sets state to false to allow the function below to change the loading state so this can be called
    useEffect(() => {
        if (loading) {
            console.log(date.toString());
            setLoading(false);
            calculate();
        }
    }, [[userDiet], loading]);

    //Function to change the date that the filter function above uses
    //Also changes loading state to trigger the recalcuation of the filtered array
    function changeDate() {
        if (!loading) {
            setDate((prevState) => (prevState = date.add({ days: 1 })));
            setLoading(true);
        } else {
            setLoading(false);
            console.log(loading);
        }
    }
    //Does the same as above but changes the date in the past from the currently displayed date
    function changeDatePast() {
        if (!loading) {
            setDate((prevState) => (prevState = date.subtract({ days: 1 })));
            setLoading(true);
        }
    }
    //Maps the filtered const which contains all the filtered food data
    //Contains an onclick to trigger an editabled popup
    let results = filtered.map((food) => (
        <>
            <div key={food.id}>{food.foodLogged}</div>
            <div>{food.calories}</div>
            <div>{food.protien}</div>
            <div>{food.fat}</div>
            <div>{food.carbs}</div>
            <button
                onClick={selectedItem}
                type={"button"}
                value={food.foodLogged}
            >
                edit
            </button>
        </>
    ));

    //This is to hold all the values added up from the filtered array
    const [total, setTotals] = React.useState({
        calories: "",
        protien: "",
        carbs: "",
        fats: "",
    });
    //This functions loops through the filtered array
    //and adds up the values into the variabled inside this function
    //Then sets the state above to equal those values
    function calculate() {
        const filtered = filterItems(date.toString());
        let calories = 0;
        let protien = 0;
        let carbs = 0;
        let fats = 0;
        if (filtered.length === 0) {
            setTotals((prevState) => (prevState = 0));
            console.log("function ran");
        } else {
            for (let i = 0; i < filtered.length; i++) {
                setTotals((prevState) => {
                    return {
                        ...prevState,
                        calories: (calories += filtered[i].calories),
                        protien: (protien += filtered[i].protien),
                        carbs: (carbs += filtered[i].carbs),
                        fats: (fats += filtered[i].fat),
                    };
                });
            }
        }
    }

    const [itemInfo, setItemInfo] = React.useState({
        foodID: "",
        foodName: "",
        calories: "",
        carbs: "",
        protien: "",
        fat: "",
        servingType: "",
        servingSize: "",
        calPer100: "",
    });
    console.log(itemInfo);

    // divide by 10 then 2
    // A is serving size b is total calories
    function reverseMath(a, b) {
        if (itemInfo.servingType === "kg" || itemInfo.servingType === "l") {
            console.log("kg");
            return a / (b / 10);
        } else {
            return (a / b) * 100;
        }
    }

    const formatter = (num, decimals) =>
        num.toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });
    //Opens up the view to edit a selected item in the food log
    //Takes the value of the button from the filtered array then sets state for the values of that item
    function selectedItem(e) {
        const selected = filtered.filter((food) =>
            food.foodLogged.includes(e.target.value)
        );
        console.log(selected);
        setItemInfo((prevState) => {
            return {
                ...prevState,
                foodID: selected[0].id,
                foodName: selected[0].foodLogged,
                servingType: selected[0].servingType,
                servingSize: selected[0].servingSize,
                calories: formatter(selected[0].calories),
                carbs: formatter(
                    reverseMath(selected[0].carbs, selected[0].servingSize)
                ),
                protien: formatter(
                    reverseMath(selected[0].protien, selected[0].servingSize)
                ),
                fat: formatter(
                    reverseMath(selected[0].fat, selected[0].servingSize)
                ),
                calPer100: formatter(
                    reverseMath(selected[0].calories, selected[0].servingSize)
                ),
            };
        });
        setOpenModal(true);
    }

    return (
        <>
            {!openModal && (
                <>
                    <h1 className={classes.header}>Todays Meals </h1>
                    <div className="flex justify-evenly w-full mb-4">
                        <Button
                            className="bg-blue-600 mr-4"
                            onClick={changeDatePast}
                            variant="contained"
                        >
                            <FontAwesomeIcon icon={faArrowLeftLong} />
                        </Button>
                        {date.toString()}
                        <Button
                            className="bg-blue-600 ml-4 "
                            onClick={changeDate}
                            variant="contained"
                        >
                            <FontAwesomeIcon icon={faArrowRightLong} />
                        </Button>
                    </div>
                    <div className={`${classes.grid} dark:bg-[#121212]`}>
                        <div className="text-base font-medium">Meal</div>
                        <div className="text-base font-medium">Calories</div>
                        <div className="text-base font-medium">Protien</div>
                        <div className="text-base font-medium">fats</div>
                        <div className="text-base font-medium">carbs</div>
                        <div className="text-base font-medium">edit</div>
                        {results}
                    </div>
                    <fieldset
                        className={`${classes.fieldset} dark:bg-[#121212]`}
                    >
                        <section className={classes.section}>
                            <label className={classes.label} htmlFor="calories">
                                Total Calories
                            </label>
                            {total.calories}
                        </section>

                        <section className={classes.section}>
                            <label className={classes.label} htmlFor="calories">
                                Total Protien
                            </label>
                            {total.protien}
                        </section>

                        <section className={classes.section}>
                            <label className={classes.label} htmlFor="calories">
                                Total Carbs
                            </label>
                            {total.carbs}
                        </section>

                        <section className={classes.sectionEnd}>
                            <label className={classes.label} htmlFor="calories">
                                Total Fat
                            </label>
                            {total.fats}
                        </section>
                    </fieldset>
                </>
            )}

            {openModal && (
                <NuritionInfo
                    foodName={itemInfo.foodName}
                    calories={itemInfo.calories}
                    calPer100={itemInfo.calPer100}
                    carbs={itemInfo.carbs}
                    protien={itemInfo.protien}
                    fat={itemInfo.fat}
                    submitData={"hello"}
                    onClick={() => setOpenModal(false)}
                    foodID={itemInfo.foodID}
                />
            )}
        </>
    );
}

const NuritionInfo = ({
    foodName,
    calories,
    calPer100,
    carbs,
    protien,
    fat,
    onClick,
    foodID,
}) => {
    const [loading, setLoading] = React.useState(false);

    const validateFields = Yup.object().shape({
        servingSize: Yup.number()
            .required("serving size must not be blank")
            .min(1, "Serving size must have a value")
            .max(1000, "Please use kgs or a lower ammount"),
        servingType: Yup.string().required("serving type must not be blank"),
    });
    let formik = useFormik({
        initialValues: {
            servingSize: "100",
            servingType: "grams",
        },
        validationSchema: validateFields,
        onSubmit: (values) => {
            alert("form submitted");
        },
    });

    const [nutritionTotals, setNutritionTotals] = React.useState({
        foodID: "",
        foodName: "",
        calories: "",
        carbs: "",
        protien: "",
        fat: "",
    });
    console.log(nutritionTotals);
    useEffect(() => {
        setNutritionTotals((prevState) => ({
            ...prevState,
            foodID: foodID,
            foodName: foodName,
            calories: math(calPer100, formik.values.servingSize),
            carbs: math(carbs, formik.values.servingSize),
            protien: math(protien, formik.values.servingSize),
            fat: math(fat, formik.values.servingSize),
            servingType: formik.values.servingType,
            servingSize: formik.values.servingSize,
            dateAdded: date,
        }));
    }, [formik.values]);

    //A is calories per 100 grams b is serving size
    function math(a, b) {
        if (
            formik.values.servingType === "kg" ||
            formik.values.servingType === "l"
        ) {
            return a * (b * 10);
        } else {
            return (a / 100) * b;
        }
    }

    const date = Temporal.Now.plainDateTimeISO();
    const now = Temporal.Now.plainDateISO().toString();
    const month = now.toLocaleString("en", { month: "long" });

    const formatter = (num, decimals) =>
        num.toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });

    function notify() {
        toast(nutritionTotals.foodName + " updated", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            pauseOnHover: false,
        });
    }

    function submitData(e) {
        e.preventDefault();
        setLoading(true);
        fetch("/api/updateFoodLog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nutritionTotals),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log("add to food log");
                notify();
                onClick();
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                router.push("/");
            });
    }

    function notify2() {
        toast(nutritionTotals.foodName + " Deleted", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            pauseOnHover: false,
        });
    }

    function deleteData(e) {
        setLoading(true);
        e.preventDefault();
        fetch("/api/deleteFoodLog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nutritionTotals),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log("add to food log");
                notify2();
                onClick();
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                router.push("/");
            });
    }
    const override = css`
        display: block;
        position: absolute !important;
        left: 45%;
        top: 40%;
        margin: 0 auto;
        border-color: red;
    `;

    return (
        <main className="flex flex-col w-full">
            <h1 className="text-2xl items-center font-semibold text-sky-500 py-2 pl-4 flex justify-between align-middle border-b border-black box-border dark:border-gray-300">
                {foodName}
                <button
                    onClick={onClick}
                    className="text-base font-semibold my-2 mr-6 w-24 h-9 rounded-lg border border-black dark:border-gray-50"
                >
                    Cancel?
                </button>
            </h1>
            <form className="flex flex-col px-4 mb-4 mt-2">
                <label className="font-semibold py-1 indent-1">
                    Serving Size
                </label>
                <input
                    type={"number"}
                    placeholder="100"
                    className="indent-1 py-1"
                    name="servingSize"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.servingSize}
                />
                {formik.errors.servingSize && formik.touched.servingSize ? (
                    <p className="text-red-600">{formik.errors.servingSize}</p>
                ) : null}

                <label className="font-semibold py-1 indent-1">
                    Serving type
                </label>
                <select
                    className="py-1"
                    name="servingType"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.servingType}
                >
                    <option value="grams">grams</option>
                    <option value="kg">kgs</option>
                    <option value="ml">mls</option>
                    <option value="l">Litres</option>
                </select>
                {formik.errors.servingType && formik.touched.servingType ? (
                    <p className="text-red-600">{formik.errors.servingType}</p>
                ) : null}

                <h3 className="text-xl font-semibold text-sky-500 pb-1 mt-4">
                    Totals
                </h3>
                <div className="font-semibold">
                    Calories: {formatter(nutritionTotals.calories)} cals
                </div>
                <div className="font-semibold">
                    Protien: {formatter(nutritionTotals.protien)}{" "}
                    {formik.values.servingType}
                </div>
                <div className="font-semibold">
                    Carbs: {formatter(nutritionTotals.carbs)}{" "}
                    {formik.values.servingType}
                </div>
                <div className="font-semibold">
                    Fat: {formatter(nutritionTotals.fat)}{" "}
                    {formik.values.servingType}
                </div>
                <div className="font-semibold pt-2">{month}</div>
            </form>

            <h2 className="text-lg font-semibold text-sky-500 pt-4 pl-4 border-t-2 border-black">
                Nutrition Information per 100 grams
            </h2>
            <section className="flex flex-col px-4 pt-1 border-b-2 border-black pb-4">
                <h3 className="flex font-semibold">
                    Calories:
                    <div className="ml-1">{calPer100} cals </div>
                </h3>
                <h3 className="flex font-semibold">
                    Carbs:
                    <div className="ml-1"> {carbs}g</div>
                </h3>
                <h3 className="flex font-semibold">
                    Protien:
                    <div className="ml-1"> {protien}g</div>
                </h3>
                <h3 className="flex font-semibold">
                    Fat:
                    <div className="ml-1"> {fat}g</div>
                </h3>
            </section>
            <BounceLoader css={override} loading={loading} />
            <div className="flex py-2">
                <button
                    className={`${classes.addToLog} mx-auto mt-5 bg-red-600`}
                    onClick={deleteData}
                    disabled={loading}
                >
                    Delete Item from Log
                </button>
                <button
                    className={`${classes.addToLog} mx-auto mt-5 bg-[#1976d2]`}
                    onClick={submitData}
                    disabled={!formik.isValid}
                >
                    Update Food Log
                </button>
            </div>
        </main>
    );
};
