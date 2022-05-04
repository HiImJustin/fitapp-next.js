import classes from "./home.module.css";
import Link from "next/link";
import Circle from "./circle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAppleWhole,
    faBook,
    faDumbbell,
    faPencil,
    faUser,
    faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

export async function getServerSideProps(context) {
    return {
        props: {
            session: await getSession(context),
        },
    };
}

function Home({ tdee }) {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    const [userState, setUserState] = React.useState({
        name: "",
        age: "",
        weight: "",
        height: "",
        gender: "",
        activity: "",
        tdee: "",
        bmr: "",
    });
    
    const [isLoaded, setIsLoaded] = React.useState();
    useEffect(() => {
        if (status !== "loading" && status === "authenticated")
            fetch(
                "http://localhost:3000/api/getUserByEmail/" + session.user.email
            )
                .then((res) => res.json())
                .then((users) => {
                    let user = users[0];
                    setUserState((prevState) => {
                        return {
                            ...prevState,
                            name: user.name,
                            age: user.age,
                            weight: user.weight,
                            height: user.height,
                            gender: user.gender,
                            activity: user.activity,
                            tdee: user.tdee,
                            bmr: user.bmr,
                        };
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
    }, [session]);
    console.log(userState);

    return (
        <main className="w-full flex flex-col items-center mb-2">
            <section className={`${classes.topUi} dark:bg-[#121212]`}>
                <Circle tdee={userState.tdee} />
            </section>
            <Items icon={faAppleWhole} href={"/addFood"} name="Add Food" />
            <Items icon={faBook} href={"/foodLog"} name="Food Log" />
            <Items
                icon={faPencil}
                href={"/Routines/Createroutine"}
                name="Create Routine"
            />
            <Items icon={faDumbbell} href={"/Routines"} name="Routines" />
            <Items icon={faUser} href={"/profile"} name="Profile" />
            <Items icon={faWrench} href={"/settings"} name="Settings" />
        </main>
    );
}
export default Home;

const Items = ({ icon, href, name }) => {
    return (
        <Link href={href}>
            <section
                className="relative flex items-center justify-center font-medium my-1 shadow-[1px_1.5px_4px_3px] shadow-gray-400
              bg-white h-16 min-h-[60px] w-11/12 rounded-md text-2xl hover:bg-[#1976d2] hover:text-white 
              dark:bg-[#121212] dark:shadow-slate-500 dark:shadow-sm dark:hover:bg-purple-900 "
            >
                <FontAwesomeIcon
                    className="absolute left-4 w-[36px] h-[36px] dark:text-blue-400"
                    icon={icon}
                />
                <p>{name}</p>
            </section>
        </Link>
    );
};
