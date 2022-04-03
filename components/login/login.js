import Head from 'next/head'
import Link from "next/link";
import classes from "./login.module.css";
import React, { useEffect } from 'react'
import { signIn, useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { JsonWebTokenError } from 'jsonwebtoken';

export default function Login() {
    
    const router = useRouter();

    const { data: session, status } = useSession()
    console.log({session, status})

    useEffect(() => {
        const securePage = async() => {
            const session = await getSession()
            if(!session) {
                return console.log('please login')
            } else {
                router.push('/Home')
            }
        }
        securePage()
    }, [])

    const [formData, setFormData] = React.useState(
        {username: "", password: ""}
    )
    
    function loginButton(event) {
            event.preventDefault();
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    [event.target.name]: event.target.value
                }
            })
            router.push('/Home')
            fetch("/api/users/login", {
                method: 'POST',
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(res => {
                //handles the response from the server
                console.log('login request sent')
            })
            .catch(err => {
                console.log('login request failed ' + err)
            })
        }
    
    function nextLoginButton(e) {
        e.preventDefault()
        signIn('github', {callbackUrl: 'http://localhost:3000/Home'})
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