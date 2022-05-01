import { getProviders, signIn, getCsrfToken } from "next-auth/react";
import classes from "../styles/login.module.css";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignIn({ providers, csrfToken }) {
    const router = useRouter();

    const { data: session, status } = useSession();
    console.log({ session, status });

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

    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });
    console.log(formData);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    }

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
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="email"
                    type="email"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <button className={classes.loginButton}>Sign in</button>

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
