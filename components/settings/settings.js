import classes from "./settings.module.css"
import { Switch } from "@mui/material"
import { signOut, useSession } from 'next-auth/react'



export default function settings() {

    function logOut(e) {
        e.preventDefault()
        signOut()
    }
    const { data: session, status } = useSession()
    const loading = status === "loading"
    console.log({session, loading})

    return (
        <section className={classes.settings}> 
            <h1 className={classes.title}>Settings</h1>
            <p>Dark Mode <Switch /></p>
            <p>Language</p>
            <p>Notifications</p>
            {session && <button onClick={logOut}>Logout</button>}
        </section>
    )
}