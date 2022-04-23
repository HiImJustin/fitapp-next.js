import classes from "./layout.module.css";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }) => {
    return (
        <div className="relative max-w-[480px] h-screen container mx-auto flex items-center flex-col overflow-hidden dark:bg-black">
            <Header />
            <main
                className="flex flex-col items-center bg-[rgb(248,248,248)] overflow-hidden overflow-y-scroll h-full w-full
            dark:text-white dark:bg-[black]"
            >
                {children}
            </main>
            <Footer />
        </div>
    );
};
export default Layout;
