import classes from "./home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBolt,
    faBowlRice,
    faBowlFood,
    faFireFlameCurved,
} from "@fortawesome/free-solid-svg-icons";

function circle({ tdee, consumed }) {
    return (
        <>
            <div>
                <div className={`${classes.circle} dark:bg-indigo-600`}>
                    <div className={`${classes.innerCircle} dark:bg-[#121212]`}>
                        <FontAwesomeIcon
                            className="w-[36px] h-[36px] mt-2 dark:text-orange-500"
                            icon={faBowlRice}
                        />
                        <p className="text-sm"> {consumed} kcal</p>
                    </div>
                </div>
                <p className="text-center text-sm mt-2">Consumed</p>
            </div>
            <div>
                <div
                    className={`${classes.circle} ${classes.middleCircle} dark:bg-indigo-600 `}
                >
                    <div className={`${classes.innerCircle} dark:bg-[#121212]`}>
                        <FontAwesomeIcon
                            className="w-[36px] h-[36px] mt-2 dark:text-yellow-300"
                            icon={faBolt}
                        />
                        <p className="text-sm">{tdee} kcal</p>
                    </div>
                </div>
                <p className="text-center text-sm mt-2">Daily Energy</p>
            </div>
            <div>
                <div className={`${classes.circle} dark:bg-indigo-600`}>
                    <div className={`${classes.innerCircle} dark:bg-[#121212]`}>
                        <FontAwesomeIcon
                            className="w-[36px] h-[36px] mt-2 dark:text-red-600"
                            icon={faFireFlameCurved}
                        />
                        <p className="text-sm">kcal</p>
                    </div>
                </div>
                <p className="text-center text-sm mt-2">Burned</p>
            </div>
        </>
    );
}
export default circle;
