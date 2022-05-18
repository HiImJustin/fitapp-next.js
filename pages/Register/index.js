import TDEE from "../../components/tdee/tdee";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { PacmanLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export default function RegisterPage() {
    let [loading, setLoading] = useState(false);

    function notify() {
        toast(formik.values.email + " registered!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            pauseOnHover: false,
        });
    }

    const validateFields = Yup.object().shape({
        email: Yup.string()
            .required("The email field cannot be blank")
            .max(30, "email must be less than 30 characters"),
        password: Yup.string()
            .required("Please enter a password")
            .max(30, "password must be less than 30 characters")
            .min(6, "password must be more than 6 characters")
            .matches(
                /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
                "password must contain one number, capital and special character"
            ),
        confirmPassword: Yup.string()
            .required("Please confirm your password")
            .oneOf([Yup.ref("password"), null], "The passwords must match"),
    });

    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: validateFields,
        onSubmit: (values) => {
            alert("form submitted");
        },
    });
    const [part1, setPart1] = useState(false);

    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    async function submit(e) {
        e.preventDefault();
        setLoading(true);
        // const response = await fetch("api/createNewUser", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(formik.values),
        // });
        await sleep(1000);
        // const data = await response.json();
        notify();
        await sleep(1000);

        // console.log(data);
        setLoading(false);
        setPart1(true);
    }
    console.log(formik.values);

    return (
        <main className="flex flex-col w-11/12 items-center">
            {!part1 && (
                <>
                    <label className="font-semibold  mt-4">Email</label>
                    <input
                        className="h-[48px] w-full text-center rounded-md indent-1 border"
                        type="text"
                        name="email"
                        placeholder="Please enter your email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email ? (
                        <p className="text-red-600 text-base">
                            {formik.errors.email}
                        </p>
                    ) : null}
                    <label className="font-semibold mt-4">Password</label>
                    <input
                        className="h-[48px] w-full text-center rounded-md  border"
                        type="text"
                        name="password"
                        placeholder="Please enter a password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.password && formik.touched.password ? (
                        <p className="text-red-600">{formik.errors.password}</p>
                    ) : null}
                    <label className="font-semibold  mt-4">
                        Confirm Password
                    </label>
                    <input
                        className="h-[48px] w-full text-center rounded-md  border"
                        type="text"
                        name="confirmPassword"
                        placeholder="Please confirm your password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.confirmPassword &&
                    formik.touched.confirmPassword ? (
                        <p className="text-red-600">
                            {formik.errors.confirmPassword}
                        </p>
                    ) : null}
                    <button
                        onClick={submit}
                        disabled={!formik.isValid || formik.values.email === ""}
                        className="dark:bg-[#3b3b3b] border w-full text-center h-[48px] mt-6 bg-white rounded-md"
                    >
                        Submit
                    </button>
                </>
            )}
            <PacmanLoader loading={loading} />
            {part1 && <TDEE name={"email"} value={formik.values.email} />}
        </main>
    );
}
