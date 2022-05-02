import { getProviders, signIn, getCsrfToken } from "next-auth/react";
import classes from "../styles/login.module.css";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function SignIn({ providers, csrfToken }) {
    const router = useRouter();

    const { data: session, status } = useSession();

    //If logged in redirects to the home page
    useEffect(() => {
        const securePage = async () => {
            const session = await getSession();
            if (session) {
                router.push("/");
            } else {
                return console.log("please login");
            }
        };
        securePage();
    }, []);

    const validateFields = Yup.object().shape({
        email: Yup.string()
            .required("The username field cannot be blank")
            .max(30, "email must be less than 30 characters"),
        password: Yup.string()
            .required("Please enter a password")
            .max(30, "password must be less than 30 characters")
            .min(6, "password must be more than 6 characters")
            .matches(
                /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
                "password must contain one number, capital and special character"
            ),
    });

    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validateFields,
        onSubmit: (values) => {
            alert("form submitted");
        },
    });

    return (
        <>
            <Head>
                <title>Login page</title>
            </Head>
            <h1 className={classes.title}>Welcome</h1>

            <form
                className={classes.login}
                method="post"
                action="/api/auth/callback/credentials"
            >
                <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                />
                <label htmlFor="email">email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />

                {/* Condtionally runs error fields */}
                {formik.errors.email && formik.touched.email ? (
                    <p className="text-red-600">{formik.errors.email}</p>
                ) : null}
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />

                {formik.errors.password && formik.touched.password ? (
                    <p className="text-red-600">{formik.errors.password}</p>
                ) : null}

                <button
                    className={classes.loginButton}
                    //If either form field has an error button is disabled
                    disabled={formik.errors.password || formik.errors.email}
                >
                    Sign in
                </button>

                <button
                    className={classes.loginButton}
                    onClick={() => signIn("github")}
                >
                    Sign with github
                </button>
                <p>
                    Dont have an Account?{" "}
                    <Link href="/Register">Register here!</Link>
                </p>
            </form>
        </>
    );
}

export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context);
    return {
        props: { csrfToken },
    };
}
