import classes from "./profile.module.css";
import { useSession, getSession } from "next-auth/react";
import React, { useEffect } from "react";
const url = process.env.NEXT_PUBLIC_API_URL;
import TDEE from "../../components/tdee/tdee";

export async function getServerSideProps(context) {
    return {
        props: {
            session: await getSession(context),
        },
    };
}
export default function Profile() {
    const { data: session, status } = useSession();

    const [user, setUser] = React.useState({
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
        fetch("http://localhost:3000/api/getUserByEmail")
            .then((res) => res.json())
            .then((user) => {
                setUser((prevState) => {
                    return {
                        ...prevState,
                        name: user.userDetails[0].name,
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

    function deleteData() {
        fetch(`${url}/deleteUser`)
            .then((res) => res.json())
            .then((user) => {
                console.log("deleted");
                setConfirmation(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const [update, setUpdate] = React.useState(false);
    const [confirmation, setConfirmation] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    return (
        <section className={classes.profile}>
            {!confirmation && !update && (
                <>
                    <h2>Your Information</h2>
                    <div>
                        <div>Display Name</div>
                        <p>{user.name}</p>
                        <div>Age</div>
                        <p>{user.age}</p>
                        <div>Weight</div>
                        <p>{user.weight}</p>
                        <div>Height</div>
                        <p>{user.height}</p>
                        <div>Gender</div>
                        <p>{user.gender}</p>
                        <div>Activity level</div>
                        <p>{user.activity}</p>
                        <div>Total Daily energy Expendeture</div>
                        <p>{user.tdee}</p>
                        <div>Base metabolic rate</div>
                        <p>{user.bmr}</p>
                        {user.name !== "" && (
                            <div className="flex ">
                                <button
                                    className={`${classes.addToLog} mt-5 mr-[5%] bg-[#1976d2]`}
                                    onClick={() => setUpdate(true)}
                                >
                                    Update Details
                                </button>
                                <button
                                    className={`${classes.addToLog}  mt-5 bg-red-600`}
                                    onClick={() => setConfirmation(true)}
                                    disabled={loading}
                                >
                                    Delete Account
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
            {confirmation && (
                <div>
                    Are you sure you want to delete your Account? All user data
                    will be deleted and require you to reauth through github
                    <div>
                        <button
                            className={`${classes.addToLog} mt-5 mr-[4%] bg-[#1976d2]`}
                            onClick={deleteData}
                        >
                            Yes
                        </button>
                        <button
                            className={`${classes.addToLog}  mt-5 bg-red-600`}
                            onClick={() => setConfirmation(false)}
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
            {update && (
                <>
                    <button onClick={() => setUpdate(false)}>cancel</button>
                    <TDEE
                        userName={user.name}
                        userAge={user.age}
                        userHeight={user.height}
                        userWeight={user.weight}
                        userSex={user.gender}
                        userActivity={user.activity}
                    />
                </>
            )}
        </section>
    );
}
