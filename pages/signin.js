import { getProviders, signIn, getCsrfToken } from "next-auth/react";
import classes from "../styles/login.module.css";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
const url = process.env.NEXT_PUBLIC_API_URL;
import { PacmanLoader } from "react-spinners";
import { css } from "@emotion/react";

// Props providers is from the getServerSideProps function
export default function SignIn({ providers }) {
    //Allows us to set custom css properties to the react-spinners package
    const override = css`
        display: block;
        margin: 0 auto;
        color: yellow;
    `;
    const router = useRouter();

    const { data: session, status } = useSession();
    const [loading, setLoading] = React.useState(false);

    //If logged in redirects to the home page
    useEffect(() => {
        console.log("loading");
        const securePage = async () => {
            const session = await getSession();
            if (session) {
                setLoading(true);
                fetch(`${url}/getUserByEmail`)
                    .then((res) => res.json())
                    .then((user) => {
                        console.log(user);
                        if (user.userDetails.length < 1) {
                            router.push("/Register");
                            setLoading(false);
                        } else {
                            router.push("/");
                            setLoading(false);
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

    return (
        <>
            <Head>
                <title>Login page</title>
            </Head>

            <div className="w-full dark:bg-[#121212] h-full flex flex-col text-center  rounded-lg">
                <h1 className={`${classes.title} dark:text-white`}>
                    Welcome to FIT
                </h1>
                {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <button
                            className={`${classes.loginButton} dark:border dark:border-white  rounded-md`}
                            onClick={() => {
                                setLoading(true);
                                signIn(provider.id);
                            }}
                        >
                            Sign in or Register with {provider.name}
                        </button>
                    </div>
                ))}
                <div className="mx-auto">
                    <PacmanLoader color="yellow" loading={loading} />
                </div>
            </div>
        </>
    );
}
//Creates an array of service provides
//that are avaliable from within the next-auth api configuration
export async function getServerSideProps(context) {
    const providers = await getProviders();
    return {
        props: { providers },
    };
}
