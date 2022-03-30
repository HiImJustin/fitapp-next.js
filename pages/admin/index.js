import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function AdminPage() {
    const { data: session, status } = useSession()

    const[content, setContent] = useState()

    useEffect(() => {
        const fetchData = async() => {
            const res = await fetch('/api/admin/adminApi')
            const json = await res.json();

            if(json.content) {
                setContent(json.content)
            }
        }
        fetchData();
    }, [session])

    if(!session) {
        return (
            <main>
                <div>
                    <h1>not singed in</h1>
                </div>
            </main>
        )
    }
    return (
        <main>
            <div>
                <h1>protected page</h1>
                <p>
                    {content}
                </p>
            </div>
        </main>
    )
}