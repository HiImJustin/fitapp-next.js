import { getSession } from 'next-auth/react'

export default async (req, res) => {
    const session = await getSession({req})

    if(session) {
        res.send({
            content: "admin page"
        });
    } else {
        res.send({
            error: "you need to be an admin"
        })
    }
}