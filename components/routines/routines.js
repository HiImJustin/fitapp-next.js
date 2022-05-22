import classes from "./routines.module.css"
import Link from "next/link"
import routinesData from "./routinesData"

export default function routines() {


    const ele = routinesData.map(data => 
    <Link href={`/Routines/${data.id}`}>
        <div className={classes.routines} key={data.id}>
            {data.exerciseName}
        </div>
    </Link>)

    return(
        <>
            <h1 className={classes.title}>My Routines</h1>    
            <ul>
                
            </ul>
            <section className={classes.routinesGrid}>
                {ele}
            </section>

        </>
    )
}
