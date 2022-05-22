import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Admin } from "../../components/oop";

export default function AdminPage() {
    const { data: session, status } = useSession();

    const [content, setContent] = useState({
        email: "",
        name: "",
        admin: "",
    });
    console.log(content);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/admin/adminApi");
            const json = await res.json();

            if (json) {
                setContent((prevState) => ({
                    ...prevState,
                    email: json.email,
                    name: json.name,
                    admin: json.admin,
                }));
            }
        };
        fetchData();
    }, [session]);

    const user = new Admin(content.email, content.name, content.admin);
    console.log(user);

    if (!session && !user.admin) {
        return (
            <main>
                <div>
                    <h1>not singed in</h1>
                </div>
            </main>
        );
    }
    return (
        <main>
            <div>
                <div>
                    {user.admin
                        ? "welcome admin user"
                        : "Howd you even get in here!"}
                </div>

                <h1>Admin page</h1>
                <div>{user.getEmail()}</div>
                <div>{user.getName()}</div>
            </div>
        </main>
    );
}
