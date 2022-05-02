import { flexbox } from "@mui/system";
import classes from "./progressbar.module.css";
export default function progressBar(props) {
    const { bgcolor, completed } = props;

    const fillerStyles = {
        height: "100%",
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: "inherit",
        textAlign: "right",
    };

    return (
        <div className={classes.containerStyles}>
            <div style={fillerStyles}>
                <span className={classes.labelStyles}>{completed}</span>
            </div>
        </div>
    );
}
