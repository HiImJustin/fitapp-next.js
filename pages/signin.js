import { getProviders, signIn, getCsrfToken } from "next-auth/react";
import classes from "../styles/login.module.css";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
const url = process.env.NEXT_PUBLIC_API_URL;

export default function SignIn({ providers }) {
    const router = useRouter();

    const { data: session, status } = useSession();

    //If logged in redirects to the home page
    useEffect(() => {
        const securePage = async () => {
            const session = await getSession();
            if (session) {
                fetch(`${url}/getUserByEmail`)
                    .then((res) => res.json())
                    .then((user) => {
                        console.log(user);
                        if (user.userDetails.length < 1) {
                            router.push("/Register");
                        } else {
                            router.push("/");
                        }
                    });
            } else {
                return console.log("please login");
            }
        };
        securePage();
    }, [signIn]);

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
    console.log(providers);

    function navigate() {
        router.push("/");
    }
    return (
        <>
            <Head>
                <title>Login page</title>
            </Head>
            <h1 className={classes.title}>Welcome to FIT</h1>

            {Object.values(providers).map((provider) => (
                <div key={provider.name} className="w-5/6">
                    <button
                        className={classes.loginButton}
                        onClick={() => {
                            signIn(provider.id);
                        }}
                    >
                        Sign in or Register with {provider.name}
                    </button>
                </div>
            ))}
        </>
    );
}

export async function getServerSideProps(context) {
    const providers = await getProviders();
    return {
        props: { providers },
    };
}
