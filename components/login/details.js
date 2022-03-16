import classes from "./details.module.css"
import Link from "next/link"
export default function Details() {

    return (
        <>
            <h2>Personal Information</h2>
            <form className={classes.detailsForm}>
                <label>Age</label>
                <input type="text"/>
                <label>Height</label>
                <input type="text"/>
                <label>Weight</label>
                <input type="text"/>
                <label>Sex</label>
                <select>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <label>Activity Level</label>
                <select>
                    <option value="High">High</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Light">Light</option>
                    <option value="sedentary">sedentary</option>
                </select>
                <div>
                </div>
                <Link href='/Home'><button>Finsh Registration</button></Link>
            </form>
        </>
    )
}