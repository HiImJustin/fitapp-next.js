import classes from './layout.module.css'
import Button from '@mui/material/Button';
import {useRouter} from 'next/router'
import React from 'react'

function Header() {

    const router = useRouter();
    const {asPath} = useRouter();

    function handleNav() {
        router.back()
    }

    return (
        <div className={classes.header}>
            <header>
                {asPath.length > 1 && <Button onClick={handleNav} variant="contained">
                    {`<--`}
                </Button>}
                <h1>FIT</h1>
            </header>
        </div>
    )
}
export default Header