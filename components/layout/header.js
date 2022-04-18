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
    const { systemTheme, theme, setTheme } = useTheme();

    const renderThemeChange = () => {
        if (!mounted) return null;

        const currentTheme = theme === "system" ? systemTheme : theme;

        if (currentTheme === "dark") {
            return <FontAwesomeIcon icon={faSun} />;
        } else {
            return <FontAwesomeIcon icon={faMoon} />;
        }
    };

    return (
        <header className={classes.header}>
            {asPath.length > 1 && (
                <Button
                    className={classes.headerButton}
                    onClick={handleNav}
                    variant="contained"
                >
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                </Button>
            )}
            <h1 className="text-lg">FIT</h1>
            <button
                className="absolute right-5"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
            {renderThemeChange()}
            </button>
        </header>
    );
}
export default Header;
