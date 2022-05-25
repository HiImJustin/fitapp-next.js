import classes from "./foodlog.module.css";
import React, { useEffect } from "react";
import { Temporal, Intl, toTemporalInstant } from "@js-temporal/polyfill";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { BounceLoader } from "react-spinners";
import prisma from "../../lib/prisma";
import { faL } from "@fortawesome/free-solid-svg-icons";
toast.configure();

export const getStaticProps = async () => {
    const foodItems = await prisma.food.findMany({});
    let food = JSON.stringify(foodItems);
    return { props: { food } };
};

export default function AddFood({ food }) {
    //Get server side props populates this with data from the food table
    const foodData = JSON.parse(food);
    console.log(foodData);
    //Set state for the search bar
    //On change the state now equals what is in the search bar
    const [foodOptions, setFoodOptions] = React.useState("");
    function handleChange(e) {
        setFoodOptions(e.target.value.toLowerCase());
    }

    //Filter creates a new array with any element that passes the test
    //Any value in foodData that matches the parameter is put in the new array
    function filterItems(foodName) {
        return foodData.filter((food) =>
            food.foodName.toLowerCase().includes(foodName.toLowerCase())
        );
    }
    //Map the fitered array into results variable along with the onlick
    const filtered = filterItems(foodOptions);

    const results = filtered.map((food) => (
        <div key={food.id} onClick={selectedItem} className="my-1">
            {food.foodName}
        </div>
    ));

    const [itemInfo, setItemInfo] = React.useState({
        foodID: "",
        foodName: "",
        calPer100: "",
        carbs: "",
        protien: "",
        fat: "",
    });

    const [openModal, setOpenModal] = React.useState(false);

    function selectedItem(e) {
        const selected = filterItems(e.target.textContent);
        console.log(selected);
        setItemInfo((prevState) => {
            return {
                ...prevState,
                foodID: selected[0].id,
                foodName: selected[0].foodName,
                calPer100: selected[0].calPer100,
                carbs: selected[0].carbs,
                protien: selected[0].protien,
                fat: selected[0].fat,
            };
        });
        setOpenModal(true);
    }

    const validateFields = Yup.object().shape({
        servingSize: Yup.number()
            .required("serving size must not be blank")
            .max(10000, "Please use kgs or a lower ammount"),
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

    // A = item info value always in grams
    // B = serving size
    // If not in ml or grams do math for kg/litre

    function math(a, b) {
        if (
            formik.values.servingType === "ml" ||
            formik.values.servingType === "grams"
        ) {
            return (a / 100) * b;
        } else {
            return a * (b * 10);
        }
    }
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
            foodID: itemInfo.foodID,
            foodName: itemInfo.foodName,
            calories: math(itemInfo.calPer100, formik.values.servingSize),
            carbs: math(itemInfo.carbs, formik.values.servingSize),
            protien: math(itemInfo.protien, formik.values.servingSize),
            fat: math(itemInfo.fat, formik.values.servingSize),
            servingType: formik.values.servingType,
            servingSize: formik.values.servingSize,
            dateAdded: date,
        }));
    }, [itemInfo, formik.values]);

    const date = Temporal.Now.plainDateTimeISO();
    const now = Temporal.Now.plainDateISO().toString();
    const month = now.toLocaleString("en", { month: "long" });

    const [loading, setLoading] = React.useState(false);

    function notify() {
        toast(itemInfo.foodName + " added to log", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            pauseOnHover: false,
        });
    }
    console.log(nutritionTotals);
    function submitData(e) {
        e.preventDefault();
        setLoading(true);
        fetch("/api/addToFoodLog", {
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
                setFoodOptions("");
            })
            .catch((err) => {
                console.log(err);
            });
        setLoading(false);
        setOpenModal(false);
    }

    let nuritionInfo = (
        <main className="flex flex-col">
            <h1 className="text-2xl items-center font-semibold text-sky-500 py-2 pl-4 flex justify-between align-middle border-b border-black box-border dark:border-gray-300">
                {itemInfo.foodName}
                <button
                    onClick={() => setOpenModal(false)}
                    className="text-base font-semibold my-2 mr-6 w-24 h-9 rounded-lg border border-black dark:border-gray-50"
                >
                    Cancel
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
                    className="py-1 indent-1"
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
                    Calories: {nutritionTotals.calories} cals
                </div>
                <div className="font-semibold">
                    Protien: {nutritionTotals.protien}{" "}
                    {formik.values.servingType}
                </div>
                <div className="font-semibold">
                    Carbs: {nutritionTotals.carbs} {formik.values.servingType}
                </div>
                <div className="font-semibold">
                    Fat: {nutritionTotals.fat} {formik.values.servingType}
                </div>
                <div className="font-semibold pt-2">{month}</div>
            </form>

            <h2 className="text-lg font-semibold text-sky-500 pt-4 pl-4 border-t-2 border-black">
                Nutrition Information per 100 grams
            </h2>
            <section className="flex flex-col px-4 pt-1 border-b-2 border-black pb-4">
                <h3 className="flex font-semibold">
                    Calories:
                    <div className="ml-1">{itemInfo.calPer100} cals </div>
                </h3>
                <h3 className="flex font-semibold">
                    Carbs:
                    <div className="ml-1"> {itemInfo.carbs}g</div>
                </h3>
                <h3 className="flex font-semibold">
                    Protien:
                    <div className="ml-1"> {itemInfo.protien}g</div>
                </h3>
                <h3 className="flex font-semibold">
                    Fat:
                    <div className="ml-1"> {itemInfo.fat}g</div>
                </h3>
            </section>
            <button
                className={`${classes.addToLog} mx-auto mt-5`}
                onClick={submitData}
            >
                Add To food Log
            </button>
            <BounceLoader loading={loading} />
        </main>
    );

    const [addNewFood, setAddNewFood] = React.useState(false);
    function addNew() {
        setAddNewFood((prevState) => !prevState);
    }
    console.log(addNew);
    const [help, setHelp] = React.useState(false);

    return (
        <>
            <h2 className={`${classes.title} text-md font-semibold`}>
                Log Food
                <button onClick={addNew} className={classes.newItem}>
                    {addNewFood ? `Cancel` : `Add custom Food?`}
                </button>
            </h2>

            {!openModal && !addNewFood && (
                <form className={classes.searchBar}>
                    <input
                        type="text"
                        onChange={handleChange}
                        className={classes.input}
                        placeholder="Search Foods"
                    />

                    {foodOptions.length > 0 && results.length > 0 && (
                        <>
                            <div
                                className={`${classes.foodOptions} font-medium py-1`}
                            >
                                {results}
                            </div>
                        </>
                    )}
                </form>
            )}
            {openModal && !addNewFood && (
                <fieldset className="w-full">{nuritionInfo}</fieldset>
            )}

            {addNewFood && (
                <>
                    <h1 className="my-1 text-base font-medium flex justify-between w-11/12">
                        Add your new custom food below
                        <button
                            className="font-semibold text-lg"
                            onClick={() => setHelp((prevState) => !prevState)}
                        >
                            ?{help && <Help />}
                        </button>
                    </h1>
                    <CustomFoodOption />
                </>
            )}
        </>
    );
}

// This function creates a new food item
export const CustomFoodOption = () => {
    function notify() {
        toast(formik.values.foodName + " added to log", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            pauseOnHover: false,
        });
    }
    //
    const validateFields = Yup.object().shape({
        foodName: Yup.string()
            .required("Food name cannot be empty")
            .max(30, "Must be less than 30 characters"),
        calPer100: Yup.number()
            .min(1, "Your food has more calories than 1 per 100grams")
            .max(10000, "Please a value less than Ten thousand")
            .required("This field cannot be blank"),
        protien: Yup.string()
            .required(" Protien field cannot be blank")
            .max(6, "Protien can only contain 6 characters"),
        carbs: Yup.number()
            .required(" Carbs field cannot be blank")
            .min(0, "Value must be more than 0")
            .max(10000, "Value cannot be more than 10,000"),
        fat: Yup.string().required("Fats cannot be blank"),
    });
    let formik = useFormik({
        initialValues: {
            foodName: "",
            calPer100: "",
            protien: "",
            carbs: "",
            fat: "",
        },
        validationSchema: validateFields,
        onSubmit: (values) => {
            alert("form submitted");
        },
    });
    const router = useRouter();
    console.log(formik.values);

    const submitNewFoodData = (e) => {
        e.preventDefault();
        fetch("/api/addFoodApi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formik.values),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.message) {
                    alert(res.message);
                } else {
                    console.log("request sent");
                    notify();
                    setAddNewFood(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <main className="flex flex-col w-11/12 text-lg my-2">
                <label className={classes.label}>Food Name</label>
                <FoodInputs
                    type={"text"}
                    name={"foodName"}
                    placeholder="Food Name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.foodName}
                />
                {formik.errors.foodName && formik.touched.foodName ? (
                    <p className="text-red-600 text-base font-medium">
                        {formik.errors.foodName}
                    </p>
                ) : null}
                <label>Calories per 100 grams</label>
                <FoodInputs
                    type={"number"}
                    name={"calPer100"}
                    placeholder="calories"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.calPer100}
                />
                {formik.errors.calPer100 && formik.touched.calPer100 ? (
                    <p className="text-red-600 text-base font-medium">
                        {formik.errors.calPer100}
                    </p>
                ) : null}
                <label>Protien per 100 grams</label>
                <FoodInputs
                    type={"number"}
                    name={"protien"}
                    placeholder={"Protien"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.protien}
                />
                {formik.errors.protien && formik.touched.protien ? (
                    <p className="text-red-600 text-base font-medium">
                        {formik.errors.protien}
                    </p>
                ) : null}
                <label>Carbs per 100 grams</label>
                <FoodInputs
                    type={"number"}
                    name={"carbs"}
                    placeholder={"carbs"}
                    value={formik.values.carbs}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {formik.errors.carbs && formik.touched.carbs ? (
                    <p className="text-red-600 text-base font-medium">
                        {formik.errors.carbs}
                    </p>
                ) : null}
                <label>Fats per 100 grams</label>
                <FoodInputs
                    type={"number"}
                    name={"fat"}
                    placeholder={"fat"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.fat}
                />
                {formik.errors.fat && formik.touched.fat ? (
                    <p className="text-red-600 text-base font-medium">
                        {formik.errors.fat}
                    </p>
                ) : null}
                <button
                    onClick={submitNewFoodData}
                    disabled={!formik.isValid}
                    className={`${classes.addToLog} mx-auto my-6`}
                >
                    Add new item
                </button>
            </main>
        </>
    );
};

const FoodInputs = ({ onBlur, name, placeholder, onChange, value, type }) => {
    return (
        <input
            className="my-1 py-2 rounded-md border border-black bg-gray-200 indent-2 text-base placeholder-black focus:placeholder-transparent"
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            value={value}
            name={name}
            onBlur={onBlur}
        />
    );
};

const Help = () => {
    return (
        <div className="absolute h-[60%] top-[70px] bg-gray-200 w-[98%] left-1">
            <img className="mx-auto w-[94%]" src="helpgif.gif" />
        </div>
    );
};
