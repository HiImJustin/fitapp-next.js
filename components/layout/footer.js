import classes from './footer.module.css'
import Link from 'next/link';

function footer() {
    return (
        <footer className={classes.footer}>
            <p><Link href="/">Home</Link></p>
            <p><Link href="/profile">Profile</Link></p>
            <p><Link href="/settings">Settings</Link></p>
        </footer>
    )
}
export default footer;