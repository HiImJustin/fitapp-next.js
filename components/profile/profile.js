import classes from "./profile.module.css"
import UserData from "./userData"
export default function profile() {

    const data = [ 
        {
            userName: "Justin",
            height: "200cm",
            weight: "106kg",
            sex: "Male"
        }
    ]
    
    return (
        <section className={classes.profile}>
            <h2>Update Personal Information</h2>
            <div>Display Name</div>
            <UserData name={data[0].userName}/>
            <div>Height</div>
            <UserData height={data[0].height}/>
            <div>Weight</div>
            <UserData weight={data[0].weight}/>
            <div>Daily activity</div>
            <p>None</p> 
            <div>Sex</div>
            <UserData sex={data[0].sex}/>
        </section>
    )
}