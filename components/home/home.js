import classes from './home.module.css'
import Link from 'next/link'
import Circle from './circle'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAppleWhole, faBook, faDumbbell, faPencil, faUser, faWrench } from "@fortawesome/free-solid-svg-icons"

function Home() {

    return(
        <>  
            <section className={classes.topUi}>
                <Circle className={classes.circle}/>
            </section>
            <section className={classes.links}>
                <li><FontAwesomeIcon icon={faAppleWhole}/>
                    <Link href='/addFood'>Add Food</Link>
                </li>
            </section>
            <section className={classes.links}>
                <li><FontAwesomeIcon icon={faBook} />
                    <Link href='/foodLog'>Food log</Link></li>
            </section>
            <section className={classes.links}>
                <li>
                    <FontAwesomeIcon icon={faPencil}/>
                    <Link href='/Routines/Createroutine'>Create Routine</Link></li>
            </section>
            <section className={classes.links}>
                <li>
                    <FontAwesomeIcon icon={faDumbbell} />
                    <Link href='/Routines'>Routines</Link>
                </li>
            </section>
            <section className={classes.links}>
                <li>
                <FontAwesomeIcon icon={faUser} />
                    <Link href='/profile'>Profile</Link></li>
            </section>
            <section className={classes.links}>
                <li>
                    <FontAwesomeIcon icon={faWrench} />
                    <Link href='/settings'>Settings</Link></li>
            </section>
        </>
    )
}
export default Home;