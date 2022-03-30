import Login from "../components/login/login"
import { useRouter } from 'next/router'
import { useSession, getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

export default function LoginPage({}) {

    const router = useRouter();
    const { data: session, status } = useSession()
    const [loading, setLoading] = useState(true)
    console.log({session, status})

    useEffect(() => {
        const securePage = async() => {
            const session = await getSession()
            if(!session) {
                // return router.push('/')
            } else {
                setLoading(false)
                router.push('/Home')
            }
        }
        securePage()
    }, [])

    return (
        <>
            <Login />
        </>
    )
}
