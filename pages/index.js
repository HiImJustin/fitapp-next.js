import Home from "../components/home/home";
import Link from "next/link";
import { useSession, getSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Temporal, Intl, toTemporalInstant } from "@js-temporal/polyfill";
import prisma from "../lib/prisma";

export const getStaticProps = async () => {
    const feed = await prisma.user.findMany({});
    let user = JSON.stringify(feed);
    return { props: { user } };
};

function HomePage({ ip, user }) {
    const router = useRouter();
    const { data: session, status } = useSession();

    // If not logged in redirects to the signin page
    useEffect(() => {
        const securePage = async () => {
            const session = getSession();
            if (status === "unauthenticated" && status !== "loading") {
                return router.push("/signin");
            }
        };
        securePage();
    }, []);

    const [content, setContent] = useState({
        email: "",
        name: "",
        admin: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/admin/adminApi");
            const json = await res.json();
            if (json) {
                setContent((prevState) => ({
                    ...prevState,
                    email: json.email,
                    name: json.name,
                    admin: json.admin,
                }));
            }
        };
        fetchData();
    }, [session]);

    const now = Temporal.Now.plainDateISO();
    const date = now;
    const month = date.toLocaleString("en", { month: "long" });
    const [lastVisited, setlastVisited] = useState();

    useEffect(() => {
        let lastHere = localStorage.getItem("lastVisited");

        if (lastHere === date) {
            setlastVisited(lastHere);
        } else {
            setlastVisited(lastHere);
            localStorage.setItem("lastVisited", JSON.stringify(date));
        }
    }, []);

    const [name, setName] = useState();

    useEffect(() => {
        let username = localStorage.getItem("name");
        if (status !== "loading" && status !== "unauthenticated") {
            setName(username);
            localStorage.setItem("name", JSON.stringify(session.user.email));
        }
    });

    return (
        <>
            <div className="w-11/12">
                Welcome back {name} you last visited on the {lastVisited}
            </div>
            <Home />
            <div className="w-[95%] h-22 dark:bg-[#121212] px-2">
                {session && content.admin && (
                    <div className="w-full h-16 bg-white flex my-2 justify-center border rounded-md text-center p-2 mt-1  shadow-[1px_1.5px_4px_3px] shadow-gray-400">
                        <button className="font-semibold text-lg">
                            <Link href="/admin">Admin page</Link>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
export default HomePage;
