export default function UserData(props) {
    return (
        <>
            <p> 
                {props.name}
                {props.height}
                {props.weight}
                {props.sex}
            </p>
        </>
    )
}