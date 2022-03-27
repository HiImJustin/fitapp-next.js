import classes from "./login.module.css";
import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import Link from "next/link";
import { signIn, useSession, getSession } from 'next-auth/react'
import Head from 'next/head'

export default function Login() {

    const router = useRouter();

    const [formData, setFormData] = React.useState(
        {username: "", password: ""}
    )
    
    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
        router.push('/Home')
        event.preventDefault();
    }

    function login(e) {
        e.preventDefault()
        signIn('github')
    }

    const { data: session, status } = useSession()
    console.log({session, status})


    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const securePage = async() => {
            const session = await getSession()
            if(!session) {
                signIn()
            } else {
                setLoading(false)
            }
        }
        securePage()
    }, [])
    
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
                    {!loading && !session && 
                        <button className={classes.loginButton} onClick={login}>github</button>
                    }
                <button className={classes.loginButton} onClick={handleChange}>Login!</button>
            </form>
            
        </>
    )
}