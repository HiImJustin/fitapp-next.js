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

    const bar1 = [{ bgcolor: "#6a1b9a", completed: 70 }];
    const bar2 = [{ bgcolor: "#00695c", completed: 60 }];
    const bar3 = [{ bgcolor: "#ef6c00", completed: 60 }];
    const bar4 = [{ bgcolor: "#6a1b9a", completed: 60 }];

    return (
        <div className={classes.containerStyles}>
            <div style={fillerStyles}>
                <span className={classes.labelStyles}></span>
            </div>

            {/* {bar1.map((item) => (
                        <ProgressBar
                            key={item.bgcolor}
                            bgcolor={item.bgcolor}
                            completed={item.completed}
                        />
                    ))} */}
        </div>
    );
}
