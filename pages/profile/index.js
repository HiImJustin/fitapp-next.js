import classes from "./profile.module.css";
import { useSession, getSession } from "next-auth/react";
import React, { useEffect } from "react";

export async function getServerSideProps(context) {
    return {
        props: {
            session: await getSession(context),
        },
    };
}
export default function Profile() {
    const { data: session, status } = useSession();
    console.log(session);

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

    useEffect(() => {
        if (status !== "loading" && status === "authenticated") {
            fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/getUserByEmail/` +
                    session.user.email
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
        } else {
            console.log("still loading");
        }
    }, [session]);
    console.log(userState);

    return (
        <section className={classes.profile}>
            <h2>Update Personal Information</h2>
            <UserData
                name={userState.name}
                age={userState.age}
                weight={userState.weight}
                height={userState.height}
                gender={userState.gender}
                activity={userState.activity}
                tdee={userState.tdee}
                bmr={userState.bmr}
            />
        </section>
    );
}

const UserData = ({
    name,
    age,
    weight,
    height,
    gender,
    activity,
    tdee,
    bmr,
}) => {
    return (
        <div>
            <div>Display Name</div>
            <p>{name}</p>
            <div>Age</div>
            <p>{age}</p>
            <div>Weight</div>
            <p>{weight}</p>
            <div>Height</div>
            <p>{height}</p>
            <div>Gender</div>
            <p>{gender}</p>
            <div>Activity level</div>
            <p>{activity}</p>
            <div>Total Daily energy Expendeture</div>
            <p>{tdee}</p>
            <div>Base metabolic rate</div>
            <p>{bmr}</p>
        </div>
    );
};
