import classes from "./home.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Items = ({ icon, href, name }) => {
    return (
        <Link href={href}>
            <section
                className="relative flex items-center justify-center font-medium my-1 shadow-[1px_1.5px_4px_3px] shadow-gray-400
              bg-white h-16 min-h-[60px] w-full rounded-md text-2xl hover:bg-[#1976d2] hover:text-white 
              dark:bg-[#121212] dark:shadow-slate-500 dark:shadow-sm dark:hover:bg-purple-900 "
            >
                <FontAwesomeIcon
                    className="absolute left-4 w-[36px] h-[36px] dark:text-blue-400"
                    icon={icon}
                />
                <p>{name}</p>
            </section>
        </Link>
    );
};

export default Items;
