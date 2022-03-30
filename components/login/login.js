import Head from 'next/head'
import Link from "next/link";
import classes from "./login.module.css";
import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import { signIn, useSession, getSession } from 'next-auth/react'

export default function Login() {

    const router = useRouter();

    const [formData, setFormData] = React.useState(
        {username: "", password: ""}
    )
    
    function loginButton(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
        router.push('/Home')
        event.preventDefault();
    }
    
    
    function nextLoginButton(e) {
        e.preventDefault()
        signIn('github', 'Credentails', {callbackUrl: 'http://localhost:3000/Home'})
    }
    

    
    return (
        <>
            <Head>
                <title>Fit app</title>
            </Head>
            <h1 className={classes.title}>Welcome</h1>

            <form className={classes.login}>
                <label htmlFor="username">Username</label>
                <input  
                    id="username" name="username" type="text" placeholder="Username">
                </input>

                <label htmlFor="password">Password</label>
                <input 
                    id="password" name="password" type="text" placeholder="Password">
                </input>
                    <p>Dont have an Account? <Link href="/Register">Register here!</Link></p>
                        <button className={classes.loginButton} onClick={nextLoginButton}>github</button>
                <button className={classes.loginButton} onClick={loginButton}>Login!</button>
            </form>
            
        </>
    )
}