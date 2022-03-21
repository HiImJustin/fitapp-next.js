import classes from "./home.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBolt, faBowlRice, faBowlFood, faFireFlameCurved,  } from "@fortawesome/free-solid-svg-icons"

function circle() { 
    return (
        <>
            <div className={classes.circle}>
                <div className={classes.innerCircle}>
                <FontAwesomeIcon icon={faBowlRice}/>
                    <p>Calories</p>
                </div>
            </div>
            <div className={`${classes.circle} ${classes.middleCircle}`}>
                <div className={classes.innerCircle}>
                    <FontAwesomeIcon icon={faBolt}/>
                    <p>Energy</p>
                </div>
            </div>
            <div className={classes.circle}>
                <div className={classes.innerCircle}>
                    <FontAwesomeIcon icon={faFireFlameCurved}/>
                    <p>Burned</p>
                </div>
            </div>
        </>
    )
}
export default circle;