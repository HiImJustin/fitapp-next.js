import classes from "./footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faWrench } from "@fortawesome/free-solid-svg-icons";
import ActiveLink from "../links/activeLink";

function footer() {
    return (
        <footer
            className="absoulte bottom-0 flex container mx-auto h-20 justify-evenly items-center bg-[#1976d2]
                    border-t-[1px] rounded-sm border-t-black box-content w-full 
                    dark:bg-[#121212] dark:border-white"
        >
            <li className="list-none">
                <ActiveLink href="/">
                    <FontAwesomeIcon
                        icon={faHouse}
                        className="text-2xl dark:text-white hover:text-3xl"
                    />
                </ActiveLink>
            </li>
            <li className="list-none mx-28">
                <ActiveLink href="/profile">
                    <FontAwesomeIcon
                        icon={faUser}
                        className="text-2xl dark:text-white hover:text-3xl"
                    />
                </ActiveLink>
            </li>
            <li className="list-none">
                <ActiveLink href="/settings">
                    <FontAwesomeIcon
                        icon={faWrench}
                        className="text-2xl dark:text-white hover:text-3xl"
                    />
                </ActiveLink>
            </li>
        </footer>
    );
}
export default footer;
