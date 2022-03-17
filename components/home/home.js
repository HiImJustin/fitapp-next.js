import classes from './home.module.css'
import Link from 'next/link'
import Circle from './circle'

function Home() {

    return(
        <>  
            <h1 className={classes.h1}>Hello home page</h1>

            <section className={classes.topUi}>
                <Circle className={classes.circle}/>
            </section>
            <section className={classes.links}>
                <h3><Link href='/addFood'>Add Food</Link></h3>
            </section>
            <section className={classes.links}>
                <h3><Link href='/foodLog'>Food log</Link></h3>
            </section>
            <section className={classes.links}>
                <h3><Link href='/Routines/Createroutine'>Create Routine</Link></h3>
            </section>
            <section className={classes.links}>
                <h3><Link href='/Routines'>Routines</Link></h3>
            </section>
            <section className={classes.links}>
                <h3><Link href='/profile'>Profile</Link></h3>
            </section>
            <section className={classes.links}>
                <h3><Link href='/settings'>Settings</Link></h3>
            </section>
        </>
    )
}
export default Home;