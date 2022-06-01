import classes from "../pages/addFood/foodlog.module.css";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
toast.configure();

export default function EditFood({
    onClick,
    idProp,
    foodProp,
    calsProp,
    protienProp,
    carbsProp,
    fatProp,
}) {
    function notify() {
        toast(formik.values.foodName + " Updated", {
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
        enableReinitialize: true,
        initialValues: {
            id: idProp,
            foodName: foodProp,
            calPer100: calsProp,
            protien: protienProp,
            carbs: carbsProp,
            fat: fatProp,
        },
        validationSchema: validateFields,
        onSubmit: (values) => {
            alert("form submitted");
        },
    });
    const router = useRouter();

    const submitNewFoodData = (e) => {
        e.preventDefault();
        fetch("/api/adminUpdateFood", {
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
                    onClick();
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
                    Edit Item
                </button>
            </main>
        </>
    );
}

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
