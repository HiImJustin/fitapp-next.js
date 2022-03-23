import TDEE from "../tdee/tdee"

export default function Details() {
    
    console.log(typeof formValues)
    const submitUserData = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/users/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
        })
        const data = await response.json()
        console.log(data)
    }

    return (
        <>
            <TDEE onClick={submitUserData}/>
        </>
    )
}