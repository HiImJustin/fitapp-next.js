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
        <section
            className={`flex flex-col justify-start w-[96%] rounded-md h-[98%] mt-2 dark:bg-[#121212] font-semibold`}
        >
            <h1 className="p-3 mt-4">Settings</h1>

            <p className="p-3 mt-2">Language</p>
            <p className="p-3 mt-2">Notifications</p>
            {session && (
                <button
                    className="border border-black w-[80%] mx-auto p-3 rounded-lg dark:bg-[#1976d2] mt-8 text-base font-semibold"
                    onClick={logOut}
                >
                    Logout
                </button>
            )}
        </section>
    );
}
