import TDEE from "../../components/tdee/tdee";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
const url = process.env.NEXT_PUBLIC_API_URL;
toast.configure();
import { useRouter } from "next/router";

export default function RegisterPage() {
    let [loading, setLoading] = useState(false);

    const { data: session, status } = useSession();
    const router = useRouter();
    console.log(session);

    //If not logged in redirects to the home page
    useEffect(() => {
        const securePage = async () => {
            const session = await getSession();
            if (!session && status !== "loading") {
                router.push("/");
            }
        };
        securePage();
    }, []);

    function notify() {
        toast(formik.values.email + " registered!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            pauseOnHover: false,
        });
    }

    return (
        <main className="flex flex-col w-11/12 items-center">
            <TDEE />
        </main>
    );
}
