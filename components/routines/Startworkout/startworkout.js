import classes from './workout.module.css'
import routine from '../routinesData'
import RepCounter from './repcounter'
import { useRouter } from 'next/router'

export default function StartWorkout() {
    
    const router = useRouter()
    let url = router.asPath

    let reduced = routine.slice(0,1)
    
    let workout = reduced.map(data => 
        <div key={data.id} className={classes.exerciseContainer}>
            <h2>{data.exerciseName}</h2>

            <section className={classes.exerciseData}>
                <div key={data.id}>{data.exercise2}</div>
                <RepCounter />
            </section>

            <section className={classes.exerciseData}>
                <div key={data.id}>{data.exercise3}</div>
                <RepCounter />
            </section>

            <section className={classes.exerciseData}>
                <div key={data.id}>{data.exercise4}</div>
                <RepCounter />
            </section>
        </div>)
    

    return (
        <section className={classes.workout}>
            {workout}
            <button> Finish Workout </button>
        </section>
    )
}