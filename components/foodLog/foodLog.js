import classes from './foodLog.module.css'
import ProgressBar from '../progressbar/progressbar'

export default function foodLog() {

    
const bar1 = [
    { bgcolor: "#6a1b9a", completed: 60 },
  ];
const bar2 = [
    { bgcolor: "#00695c", completed: 60 },
  ];
const bar3 = [
    { bgcolor: "#ef6c00", completed: 60 },
  ];
const bar4 = [
    { bgcolor: "#6a1b9a", completed: 60 },
  ];

    return (
        <>
            <h1 className={classes.header}>Todays Meals</h1>
                <fieldset >
                    <section className={classes.section}>

                        <label className={classes.label} htmlFor='calories'>Total Calories</label>
                        {bar1.map((item) => (
                            <ProgressBar bgcolor={item.bgcolor} completed={item.completed} />
                        ))}
                    </section>

                    <section className={classes.section}>
                        <label className={classes.label} htmlFor='calories'>Total Protien</label>
                        {bar2.map((item, id) => (
                            <ProgressBar bgcolor={item.bgcolor} completed={item.completed} />
                        ))}

                    </section>

                    <section className={classes.section}>
                        <label className={classes.label} htmlFor='calories'>Total Carbs</label>
                        {bar3.map((item) => (
                            <ProgressBar bgcolor={item.bgcolor} completed={item.completed} />
                        ))}
                    </section>

                    <section className={classes.section}>
                        <label className={classes.label} htmlFor='calories'>Total Fat</label>
                        {bar4.map((item) => (
                            <ProgressBar bgcolor={item.bgcolor} completed={item.completed} />
                        ))}
                    </section>

                    <section className={classes.section}>
                        <h3>Meals</h3>
                        <p>This meal Cals: 200</p>
                        <p>Another meal Cals: 300</p>
                    </section>

                </fieldset>
        </>
    )
}