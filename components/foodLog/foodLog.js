import classes from "./foodlog.module.css";
import ProgressBar from "../progressbar/progressbar";
import { useSession, getSession } from "next-auth/react";
import React, { useEffect } from "react";

export async function getServerSideProps(context) {
    return {
        props: {
            session: await getSession(context),
        },
    };
}
export default function FoodLog({ calories, protien, carbs, fat }) {
    const { data: session, status } = useSession();
    console.log(session);

    const bar1 = [{ bgcolor: "#6a1b9a", completed: 60 }];
    const bar2 = [{ bgcolor: "#00695c", completed: 60 }];
    const bar3 = [{ bgcolor: "#ef6c00", completed: 60 }];
    const bar4 = [{ bgcolor: "#6a1b9a", completed: 60 }];

    return (
        <>
            <h1 className={classes.header}>Todays Meals</h1>
            <fieldset>
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
