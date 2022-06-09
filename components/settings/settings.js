import { signOut, useSession } from "next-auth/react";
import { PacmanLoader } from "react-spinners";
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";

export default function Settings() {
    //
    const { data: session, status } = useSession();

    const override = css`
        display: block;
        margin: 0 auto;
        color: yellow;
    `;

    function logOut() {
        signOut({ callbackUrl: "http://localhost:3000/signin" });
    }

    const [loading, setLoading] = React.useState(false);

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
                    onClick={() => {
                        setLoading(true);
                        logOut();
                    }}
                >
                    Logout
                </button>
            )}
            <PacmanLoader loading={loading} css={override} />
        </section>
    );
}
