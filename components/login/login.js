import classes from "./login.module.css";
import React from 'react'
import {useRouter} from 'next/router'
import Link from "next/link";

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

    return (
        <>
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
                <button className={classes.loginButton} onClick={handleChange}>Login!</button>
            </form>
        </>
    )
}