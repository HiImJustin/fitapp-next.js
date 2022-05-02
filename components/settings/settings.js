import classes from "./settings.module.css";
import { Switch } from "@mui/material";
import { signOut, useSession } from "next-auth/react";

export default function Settings() {
    const Item = (props) => (
        <div>
            <div id={props.query.id} userIP={props.userIP} />
        </div>
    );

    Item.getInitialProps = async ({ req }) => {
        const userIP = req.headers["x-real-ip"] || req.connection.remoteAddress;
        return { userIP };
    };

    function logOut() {
        signOut({ callbackUrl: "http://localhost:3000/signin" });
    }
    const { data: session, status } = useSession();
    const loading = status === "loading";
    console.log({ session, loading });

    return (
        <section className={classes.settings}>
            <h1 className={classes.title}>Settings</h1>

            <p>Language</p>
            <p>Notifications</p>
            {session && <button onClick={logOut}>Logout</button>}
        </section>
    );
}
