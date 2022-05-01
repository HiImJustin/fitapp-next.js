import classes from "./foodlog.module.css";
import React, { useEffect } from "react";
import { query } from "../../lib/db";
import { Temporal, Intl, toTemporalInstant } from "@js-temporal/polyfill";
import { useRouter } from "next/router";

export async function getServerSideProps() {
    let foodDataProps = await query("select * from food");
    return { props: { foodDataProps } };
}

export default function AddFood({ foodDataProps }) {
    //Get server side props populates this with data from the food table
    const foodData = foodDataProps;

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
            food.foodName.toLowerCase().includes(foodName)
        );
    }
    const filtered = filterItems(foodOptions);

    //Map the fitered array into results variable along with the onlick
    const results = filtered.map((food) => (
        <div key={food.foodID} onClick={selectedItem} className="my-1">
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

    function selectedItem(e) {
        const selected = filterItems(e.target.textContent);
        console.log(selected);
        setItemInfo((prevState) => {
            return {
                ...prevState,
                foodID: selected[0].foodID,
                foodName: selected[0].foodName,
                calPer100: selected[0].calPer100,
                carbs: selected[0].carbs,
                protien: selected[0].protien,
                fat: selected[0].fat,
            };
        });
        setOpenModal(true);
    }
    const [openModal, setOpenModal] = React.useState(false);

    const [formValues, setFormValues] = React.useState({
        servingSize: "100",
        servingType: "grams",
    });

    function handleFormData(e) {
        const { name, value } = e.target;
        setFormValues((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    }
    // A = item info value always in grams
    // B = serving size
    // If not in ml or grams do math for kg/litre
    function math(a, b) {
        if (
            formValues.servingType === "ml" ||
            formValues.servingType === "grams"
        ) {
            return (a / 100) * b;
        } else {
            return a * (b * 10);
        }
    }
    const [nutritionTotals, setNutritionTotals] = React.useState({
        foodID: "",
        calories: "",
        carbs: "",
        protien: "",
        fat: "",
        userID: "",
        dateAdded: "",
    });

    useEffect(() => {
        setNutritionTotals((prevState) => ({
            ...prevState,
            foodID: itemInfo.foodID,
            calories: math(itemInfo.calPer100, formValues.servingSize),
            carbs: math(itemInfo.carbs, formValues.servingSize),
            protien: math(itemInfo.protien, formValues.servingSize),
            fat: math(itemInfo.fat, formValues.servingSize),
            // userID: session.id, makes it very hard to test
            dateAdded: now.toString(),
        }));
    }, [itemInfo, formValues]);

    const now = Temporal.Now.plainDateTimeISO();
    const month = now.toLocaleString("en", { month: "long" });

    function submitData() {
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
            })
            .catch((err) => {
                console.log("failed" + err);
            });
    }
    let nuritionInfo = (
        <main className="flex flex-col">
            <h1 className="text-2xl font-semibold text-sky-500 my-2 pl-4 pb-1">
                {itemInfo.foodName}
            </h1>
            <form className="flex flex-col px-4 mb-4">
                <label className="font-semibold py-1 indent-1">
                    Serving Size
                </label>
                <input
                    type={"number"}
                    placeholder="100"
                    className="indent-1"
                    onChange={handleFormData}
                    name="servingSize"
                />

                <label className="font-semibold py-1 indent-1">
                    Serving type
                </label>
                <select
                    className=""
                    onChange={handleFormData}
                    name="servingType"
                >
                    <option value={"grams"}>grams</option>
                    <option value={"kg"}>kg's</option>
                    <option value={"ml"}>ml's</option>
                    <option value={"l"}>L's</option>
                </select>

                <h3 className="text-xl font-semibold text-sky-500 pb-1 mt-4">
                    Totals
                </h3>
                <div className="font-semibold">
                    Calories: {nutritionTotals.calories} cals
                </div>
                <div className="font-semibold pt-2">
                    {month} {now.day}
                </div>
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
        </main>
    );

    const [addNewFood, setAddNewFood] = React.useState(false);
    function addNew() {
        setAddNewFood((prevState) => !prevState);
    }

    return (
        <>
            <h2 className={`${classes.title} text-md font-semibold`}>
                Log Food
                <button onClick={addNew} className={classes.newItem}>
                    Add custom Food?
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

                    {foodOptions.length > 0 && (
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
            {openModal && (
                <fieldset className="w-full">{nuritionInfo}</fieldset>
            )}

            {addNewFood && (
                <>
                    <h1 className="my-1 text-base font-medium flex justify-between w-11/12">
                        Add your new custom food below
                        <button
                            className="mr-2"
                            onClick={() => {
                                setAddNewFood(false);
                            }}
                        >
                            Cancel?
                        </button>
                    </h1>
                    <CustomFoodOption />
                </>
            )}
        </>
    );
}

const CustomFoodOption = () => {
    function handleFormData(e) {
        const { name, value } = e.target;
        setFormValues((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    }
    const [formValues, setFormValues] = React.useState({
        foodName: "",
        calPer100: "",
        protien: "",
        carbs: "",
        fat: "",
    });
    console.log(formValues);
    const router = useRouter();

    const submitNewFoodData = async (event) => {
        event.preventDefault();
        //CHANGE THIS
        const response = await fetch("/api/addFoodApi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues),
        });
        const data = await response.json();
        console.log(data);
        router.push("/addFood");
    };
    return (
        <>
            <main className="flex flex-col w-11/12 text-lg my-4">
                <FoodInputs
                    name={"foodName"}
                    placeholder={"Food Name"}
                    onChange={handleFormData}
                    value={formValues.foodName}
                />
                <FoodInputs
                    name={"calPer100"}
                    placeholder={"calories"}
                    onChange={handleFormData}
                    value={formValues.calPer100}
                />
                <FoodInputs
                    name={"protien"}
                    placeholder={"Protien"}
                    onChange={handleFormData}
                    value={formValues.protien}
                />
                <FoodInputs
                    name={"carbs"}
                    placeholder={"carbs"}
                    value={formValues.carbs}
                    onChange={handleFormData}
                />
                <FoodInputs
                    name={"fat"}
                    placeholder={"fat"}
                    onChange={handleFormData}
                    value={formValues.fat}
                />
                <button
                    onClick={submitNewFoodData}
                    className={`${classes.addToLog} mx-auto my-6`}
                >
                    Add new item
                </button>
            </main>
        </>
    );
};

const FoodInputs = ({ name, placeholder, onChange, value }) => {
    return (
        <input
            className="my-1 py-2 rounded-sm bg-gray-200 indent-2 text-base placeholder-black focus:placeholder-transparent"
            onChange={onChange}
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
        />
    );
};
