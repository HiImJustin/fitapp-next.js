import classes from './footer.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faUser, faWrench } from "@fortawesome/free-solid-svg-icons"
import ActiveLink from '../links/activeLink';

function footer() {

    return (
        <footer className={classes.footer}>
            
            <li>
                <ActiveLink href="/Home"><FontAwesomeIcon icon={faHouse}/></ActiveLink>
            </li>
            <li>
                <ActiveLink href="/profile"><FontAwesomeIcon icon={faUser} /></ActiveLink>
            </li>
            <li>
                <ActiveLink href="/settings"><FontAwesomeIcon icon={faWrench} /></ActiveLink>
            </li>
        </footer>
    )
}
export default footer;