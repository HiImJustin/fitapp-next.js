import classes from "./home.module.css"

function circle() { 
    return (
        <>
            <div className={classes.circle}>
                <div className={classes.innerCircle}>
                    <p>Calories</p>
                </div>
            </div>
            <div className={`${classes.circle} ${classes.middleCircle}`}>
                <div className={classes.innerCircle}>
                    <p>TDEE</p>
                </div>
            </div>
            <div className={classes.circle}>
                <div className={classes.innerCircle}>
                    <p>Burned</p>
                </div>
            </div>
        </>
    )
}
export default circle;