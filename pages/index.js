import Home from "../components/home/home";
import Link from "next/link";
import { useSession, getSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

function HomePage({ ip }) {
    const router = useRouter();
    const { data: session, status } = useSession();

    //If not logged in redirects to the signin page
    useEffect(() => {
        const securePage = async () => {
            const session = await getSession();
            if (!session && !status) {
                return router.push("/signin");
            } else {
                console.log(session);
            }
        };
        securePage();
    }, []);

    return (
        <>
            {session && (
                <div className="w-11/12 mt-1">
                    singed in as {session.user.email} ip: {ip}
                    <button>
                        <Link href="/admin">admin page</Link>
                    </button>
                </div>
            )}
            {/* <pre>{JSON.stringify(users, null, 4)}</pre> */}
            <Home />
        </>
    );
}
export default HomePage;

export async function getServerSideProps({ req }) {
    const forwarded = req.headers["x-forwarded-for"];
    const ip = forwarded
        ? forwarded.split(/, /)[0]
        : req.connection.remoteAddress;
    console.log(ip);
    return { props: { ip } };
}
