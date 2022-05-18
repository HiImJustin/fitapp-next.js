import classes from "./foodlog.module.css";
import ProgressBar from "../progressbar/progressbar";
import { useSession, getSession } from "next-auth/react";
import React, { useEffect } from "react";
const url = process.env.NEXT_PUBLIC_API_URL;

export async function getServerSideProps(context) {
    return {
        props: {
            session: await getSession(context),
        },
    };
}

export default function FoodLog({}) {
    const { session, status } = useSession();

    const bar1 = [{ bgcolor: "#6a1b9a", completed: 60 }];
    const bar2 = [{ bgcolor: "#00695c", completed: 60 }];
    const bar3 = [{ bgcolor: "#ef6c00", completed: 60 }];
    const bar4 = [{ bgcolor: "#6a1b9a", completed: 60 }];

    const [userDiet, setUserDiet] = React.useState([]);

    useEffect(() => {
        fetch(`${url}/getUserDiet`)
            .then((res) => res.json())
            .then((food) => {
                setUserDiet((prevState) => food);
                console.log(food);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    console.log(userDiet);

    let results = "";
    if (userDiet === []) {
        results = <div></div>;
    } else {
        results = userDiet.map((food) => (
            <>
                <div key={food.id}>{food.foodLogged}</div>
                <div>{food.calories}</div>
                <div>{food.protien}</div>
                <div>{food.fat}</div>
                <div>{food.carbs}</div>
            </>
        ));
    }
    console.log(results);

    function math() {}
    const [total, setTotals] = React.useState({
        calories: "",
        protien: "",
        carbs: "",
        fats: "",
    });
    useEffect(() => {}, []);

    return (
        <>
            <h1 className={classes.header}>Todays Meals</h1>
            <div className={classes.grid}>
                <div className="text-base font-medium">Meal</div>
                <div className="text-base font-medium">Calories</div>
                <div className="text-base font-medium">Protien</div>
                <div className="text-base font-medium">fats</div>
                <div className="text-base font-medium">carbs</div>
                {results}
            </div>
            <fieldset className={classes.fieldset}>
                <section className={classes.section}>
                    <label className={classes.label} htmlFor="calories">
                        Total Calories
                    </label>
                    {bar1.map((item) => (
                        <ProgressBar
                            key={item.bgcolor}
                            bgcolor={item.bgcolor}
                            completed={item.completed}
                        />
                    ))}
                </section>

                <section className={classes.section}>
                    <label className={classes.label} htmlFor="calories">
                        Total Protien
                    </label>
                    {bar2.map((item) => (
                        <ProgressBar
                            key={item.bgcolor}
                            bgcolor={item.bgcolor}
                            completed={item.completed}
                        />
                    ))}
                </section>

                <section className={classes.section}>
                    <label className={classes.label} htmlFor="calories">
                        Total Carbs
                    </label>
                    {bar3.map((item) => (
                        <ProgressBar
                            key={item.bgcolor}
                            bgcolor={item.bgcolor}
                            completed={item.completed}
                        />
                    ))}
                </section>

                <section className={classes.section}>
                    <label className={classes.label} htmlFor="calories">
                        Total Fat
                    </label>
                    {bar4.map((item) => (
                        <ProgressBar
                            key={item.bgcolor}
                            bgcolor={item.bgcolor}
                            completed={item.completed}
                        />
                    ))}
                </section>
            </fieldset>
        </>
    );
}
