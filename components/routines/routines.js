import classes from "./routines.module.css"
import Link from "next/link"
import routinesData from "./routinesData"

export default function routines() {
    console.log(routinesData)
    return(
        <>
            <h1 className={classes.title}>My Routines</h1>    

            <section className={classes.routinesGrid}>
                <div className={classes.routines}><Link href='/Chest'>Chest</Link></div>
                <div className={classes.routines}><Link href='/Legs'>Legs</Link></div>
                <div className={classes.routines}><Link href='/Back'>Back</Link></div>
                <div className={classes.routines}><Link href='/Biceps'>Biceps</Link></div>
                <div className={classes.routines}><Link href='/Cardio'>Cardio</Link></div>
                <div className={classes.routines}><Link href='/FullBody'>Full Body</Link></div>
            </section>

        </>
    )
}
