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
            const session = await getSession();
            if (status === "unauthenticated" && status !== "loading") {
                return router.push("/signin");
            } else {
                console.log(session);
            }
        };
        securePage();
    }, []);

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
            <Home />
            <div className="w-11/12 dark:bg-[#121212] py-2 px-2">
                {session && (
                    <div className="w-11/12 mt-1">
                        <button>
                            <Link href="/admin">admin page</Link>
                        </button>
                    </div>
                )}
                <div>
                    Welcome back {name} you last visited on the {lastVisited}
                </div>
            </div>
            {/* <pre>{JSON.stringify(users, null, 4)}</pre> */}
        </>
    );
}
export default HomePage;

// export async function getServerSideProps({ req }) {
//     const forwarded = req.headers["x-forwarded-for"];
//     const ip = forwarded
//         ? forwarded.split(/, /)[0]
//         : req.connection.remoteAddress;
//     console.log(ip);
//     return { props: { ip } };
// }
