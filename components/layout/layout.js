import classes from "./layout.module.css"
import Header from './header'
import Footer from './footer'
const Layout = ({children}) => {

    return (
        <div className={classes.appContainer}>
            <Header />
            <main className={classes.appContainerInner}>
                {children}
            </main>
            <Footer />
        </div>
    )
}
export default Layout