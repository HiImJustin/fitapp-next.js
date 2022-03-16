import classes from "./register.module.css"
import Link from "next/dist/client/link"
export default function Register() {
    

    return (
        <main className={classes.register}>
            <h1>Welcome to FIT</h1>
            
            <form className={classes.registerForm}>
                <h3>Please complete the registration process</h3>
                <label>Name:</label>
                <input type="text" placeholder="Username"/>
                <label>Password:</label>
                <input type="text" placeholder="Password"></input>
                <Link href="/Register/details"><button>Register</button></Link>
            </form>
        </main>
    )
}