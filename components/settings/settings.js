import classes from "./settings.module.css"

export default function settings() {
    return (
        <section className={classes.settings}> 
            <h1 className={classes.title}>Settings</h1>
            <p>Dark Mode</p>
            <p>Language</p>
            <p>Notifications</p>
            <button>Logout</button>
        </section>
    )
}