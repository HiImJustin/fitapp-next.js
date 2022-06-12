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
import { useSession, getSession } from "next-auth/react";
import React, { useEffect } from "react";
import { Temporal, Intl, toTemporalInstant } from "@js-temporal/polyfill";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
    return {
        props: {
            session: await getSession(context),
        },
    };
}

function Home({ tdee }) {
    //
    const router = useRouter();

    const { data: session, status } = useSession();
    //Created state to store the user details when fetched
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
    //Creates state to store information of the user submitted food data
    const [userDiet, setUserDiet] = React.useState([]);

    //Fetches the current user details and user diet information, sets it into state
    useEffect(() => {
        fetch("/api/getUserDetails")
            .then((res) => res.json())
            .then((users) => {
                let user = users;
                setUserDiet((prevState) => user.userDiet);
                setUserState((prevState) => {
                    return {
                        ...prevState,
                        name: user.name,
                        age: user.userDetails[0].age,
                        weight: user.userDetails[0].weight,
                        height: user.userDetails[0].height,
                        gender: user.userDetails[0].gender,
                        activity: user.userDetails[0].activity,
                        tdee: user.userDetails[0].tdee,
                        bmr: user.userDetails[0].bmr,
                    };
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    //Stores the current data into a string
    const now = Temporal.Now.plainDateISO();
    //State for storing the current data
    const [date, setDate] = React.useState(now);
    //State to display the total amount of calories consumed for todays date
    const [total, setTotals] = React.useState({
        calories: "",
    });

    //Function to filter the items in state based on the current date and the date
    //userDiet is the state varible which is set in the earlier useEffect
    function filterItems(date) {
        return userDiet.filter((food) =>
            food.dateAdded.toString().includes(date.toString())
        );
    }
    //when userstate or userDiet changes we filter through the userDiet state
    //returns the array of userDiet values that matches the current date
    useEffect(() => {
        //Filter the array using the above function
        const filtered = filterItems(date.toString());
        //Calories must = 0 in the event that there are no logged food data for the day
        let calories = 0;
        if (filtered.length === 0) {
            setTotals((prevState) => (prevState = 0));
        } else {
            for (let i = 0; i < filtered.length; i++) {
                setTotals((prevState) => {
                    return {
                        ...prevState,
                        calories: (calories += filtered[i].calories),
                    };
                });
            }
        }
    }, [userState, userDiet]);

    // //THIS HERE CONTAINS THE CURRENT FILTERED FOOD ITEMS
    // const filtered = filterItems(date.toString());

    return (
        <main className="w-full flex flex-col items-center mb-2">
            <section className={`${classes.topUi} dark:bg-[#121212]`}>
                <Circle tdee={userState.tdee} consumed={total.calories} />
            </section>
            <Items icon={faAppleWhole} href={"/addFood"} name="Add Food" />
            <Items icon={faBook} href={"/foodLog"} name="Food Log" />
            <Items icon={faUser} href={"/profile"} name="Profile" />
            <Items icon={faWrench} href={"/settings"} name="Settings" />
            <Items
                className={
                    "opacity-50 text-base hover:bg-white hover:text-black"
                }
                icon={faPencil}
                href={"/"}
                name="Comming Soon! Create Routine"
            />
            <Items
                disabled
                className={
                    "opacity-50 text-base hover:bg-white hover:text-black"
                }
                icon={faDumbbell}
                href={"/"}
                name="Comming soon! Routines"
            />
        </main>
    );
}
export default Home;

const Items = ({ icon, href, name, className }) => {
    return (
        <Link href={href}>
            <section
                className={`${className} relative flex items-center justify-center font-medium my-1 shadow-[1px_1.5px_4px_3px] shadow-gray-400 bg-white h-16 min-h-[60px] w-11/12 rounded-md text-2xl hover:bg-[#1976d2] hover:text-white dark:bg-[#121212] dark:shadow-slate-500 dark:shadow-sm dark:hover:bg-purple-900`}
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
