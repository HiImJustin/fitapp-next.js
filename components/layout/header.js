import classes from "./layout.module.css";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
    faArrowLeftLong,
    faMoon,
    faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";

function Header() {
    const router = useRouter();
    const { asPath } = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    function handleNav() {
        router.back();
    }

    const { theme, setTheme } = useTheme();

    const renderThemeChange = () => {
        if (!mounted) return null;

        const currentTheme = localStorage.getItem("theme");

        if (currentTheme === "dark") {
            return <FontAwesomeIcon icon={faSun} />;
        } else {
            return <FontAwesomeIcon icon={faMoon} />;
        }
    };
    function changeTheme() {
        if (theme === "light") {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
        } else {
            setTheme("light");
            localStorage.setItem("theme", "light");
        }
    }

    return (
        <header
            className="relative container mx-auto flex items-center justify-center bg-white w-full box-border border-b-[1px] border-black dark:text-white dark:bg-[#121212] dark:border-white
            h-20
        "
        >
            {asPath.length > 1 && (
                <Button
                    className={classes.headerButton}
                    onClick={handleNav}
                    variant="contained"
                >
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                </Button>
            )}
            <h1 className="text-3xl font-semibold text-center dark:white">
                FIT
            </h1>
            <button className="absolute text-2xl right-6" onClick={changeTheme}>
                {renderThemeChange()}
            </button>
        </header>
    );
}
export default Header;
