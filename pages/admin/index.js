import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Admin } from "../../components/oop";
import { useRouter } from "next/router";
import AdminPannel from "../../components/admin";
import React from "react";
import TDEE from "../../components/tdee/tdee";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomFoodOption } from "../addFood";
import EditFood from "../../components/foodOptions";


export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: yellow;
    `;

    const [content, setContent] = useState({
        email: "",
        name: "",
        admin: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/admin/adminApi");
            const json = await res.json();
            if (!json.error) {
                setContent((prevState) => ({
                    ...prevState,
                    email: json.email,
                    name: json.name,
                    admin: json.admin,
                }));
            } else {
                console.log("please log in and be an admin");
                router.push("/");
            }
        };
        fetchData();
    }, [session]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/admin/allowedIp");
            const json = await res.json();
            if (json) {
                console.log(json);
                console.log("allowed");
            } else {
                alert("This ip address is not allowed");
                router.push("/");
            }
        };
        fetchData();
    }, [session]);

    const user = new Admin(content.email, content.name, content.admin);
    let gotEmail = user.getEmail();
    let gotName = user.getName();

    const [activityLog, setActivityLog] = React.useState(false);
    const [activityLogData, setActivityLogData] = React.useState([]);
    const [ip, setIp] = React.useState([]);

    function moderateActivityLog() {
        let info = "activityLog";
        fetch("/api/moderateLog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
        })
            .then((res) => res.json())
            .then((logData) => {
                console.log(logData);
                if (logData) {
                    setActivityLogData((prevState) => logData);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        setIp(
            (prevState) =>
                (prevState = [
                    ...new Set(activityLogData.map((item) => item.ip)),
                ])
        );
    }, [activityLogData]);

    function filterIps(ipAdd) {
        return activityLogData.filter((ip) => ip.ip.includes(ipAdd));
    }

    useEffect(() => {
        let info = "allowdIps";
        fetch("/api/moderateLog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
        })
            .then((res) => res.json())
            .then((ips) => {
                let allowed = ips.filter((e) => e.allowed === true);
                let banned = ips.filter((e) => e.allowed === false);
                setWhiteList((prevState) => allowed);
                setBlackList((prevState) => banned);
            });
    }, []);

    const [whitelist, setWhiteList] = React.useState([]);
    const [blacklist, setBlackList] = React.useState([]);

    function addToWhitelist(e) {
        let selected = e.target.value;
        let data = [];
        data.push(selected, true);
        if (!blacklist.includes(selected) && !whitelist.includes(selected)) {
            setWhiteList((prevState) => [...prevState, data]);
            sendIpData(data);
        } else {
            alert(
                "please remove the ip from the blacklist first or the ip is already added"
            );
        }
    }

    function addToBlackList(e) {
        let selected = e.target.value;
        let data = [];
        data.push(selected, false);

        if (!whitelist.includes(selected)) {
            setBlackList((prevState) => [...prevState, data]);
            sendIpData(data);
        } else {
            alert("please remove the ip from the whitelist first");
        }
    }

    function removeWhiteList(e) {
        let selected = e.target.textContent;
        let filtered = whitelist.filter((e) => !e.ip.includes(selected));

        setWhiteList((prevState) => filtered);
        deleteIpData(selected);
    }
    function removeBlackList(e) {
        let selected = e.target.textContent;
        let filtered = blacklist.filter((e) => !e.ip.includes(selected));

        setBlackList((prevState) => filtered);
        deleteIpData(selected);
    }

    function sendIpData(ip) {
        fetch("/api/ipData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ip),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function deleteIpData(ip) {
        fetch("/api/deleteIpData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ip),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //State for userDetails
    const [userDetailsOpen, setUserDetailsOpen] = React.useState(false);
    const [userDetails, setUserDetails] = React.useState({});
    function moderateUser() {
        fetch("/api/adminGetUsers")
            .then((res) => res.json())
            .then((userData) => {
                console.log(userData);
                if (userData) {
                    setUserDetails((prevState) => userData);
                    setUserDetailsOpen(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const [selectedDetails, setSelectedDetails] = React.useState([]);
    const [selectedDetailsOpen, setSelectedDetailsOpen] = React.useState(false);
    const [confirmation, setConfirmation] = React.useState(false);

    const validateFields = Yup.object().shape({
        name: Yup.string()
            .required("The name field cannot be blank")
            .matches(
                /^[a-zA-Z0-9]+$/,
                "Only alphanumeric characters are allowed for this field "
            )
            .max(30, "Please choose a name with less than 30 characters"),
        email: Yup.string()
            .required("The email field cannot be blank")
            .email()
            .max(30, "Please choose a name with less than 30 characters"),
    });

    let formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: selectedDetails.name,
            email: selectedDetails.email,
            userType: JSON.stringify(selectedDetails.userType),
        },
        validationSchema: validateFields,
    });
    function editUser(e) {
        e.preventDefault();
        let userEmail = e.target.textContent;
        fetch("/api/adminEditUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userEmail),
        })
            .then((res) => res.json())
            .then((userData) => {
                setSelectedDetails(userData);
                setSelectedDetailsOpen(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function deleteUser() {
        fetch(`api/adminDeleteUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedDetails.email),
        })
            .then((res) => res.json())
            .then((user) => {
                console.log(user);
                console.log("deleted");
                setConfirmation(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    function updateUser(e) {
        e.preventDefault();
        fetch("api/adminUpdateUser", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(formik.values),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if (res.message) {
                    alert(res.message);
                }
                alert(res.email + " updated");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //state for food data
    const [foodTable, setFoodTable] = React.useState(false);
    const [addFood, setAddFood] = React.useState(false);
    const [foodData, setFoodData] = React.useState([]);

    function moderateFoodData() {
        let info = "food";
        fetch("/api/moderateLog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
        })
            .then((res) => res.json())
            .then((food) => {
                if (food) {
                    setFoodData((prevState) => food);
                    setFoodTable(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const [foodConfirm, setFoodConfirm] = React.useState(false);
    const [deleteConfirm, setDeleteConfirm] = React.useState();

    function dF(e) {
        let selected = e.target.value;
        setDeleteConfirm(selected);
        setFoodConfirm(true);
    }

    function deleteFood(e) {
        fetch("/api/adminDeleteFood", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(deleteConfirm),
        })
            .then((res) => res.json())
            .then((res) => {
                setFoodConfirm(false);
                alert(res.foodName + " Deleted");
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const [itemInfo, setItemInfo] = React.useState({
        foodID: "",
        foodName: "",
        calPer100: "",
        carbs: "",
        protien: "",
        fat: "",
    });

    function filterItems(id) {
        return foodData.filter((e) => e.id.toString().includes(id));
    }

    function selectedItem(e) {
        const selected = filterItems(e.target.value);
        setEdit(true);
        setItemInfo((prevState) => {
            return {
                ...prevState,
                foodID: selected[0].id,
                foodName: selected[0].foodName,
                calPer100: selected[0].calPer100,
                carbs: selected[0].carbs,
                protien: selected[0].protien,
                fat: selected[0].fat,
            };
        });
    }
    const [edit, setEdit] = React.useState(false);

    return (
        <>
            <main className="flex flex-col w-[96%] text-center">
                <div>
                    <div>
                        {user.admin
                            ? "Welcome admin user"
                            : "Howd you even get in here!"}
                    </div>
                    <div>{gotEmail}</div>
                    <div>{gotName}</div>
                </div>
            </main>

            {content.admin && (
                <>
                    <div className="w-[96%]">
                        <div className="flex flex-col w-full">
                            {!activityLog && (
                                <Items
                                    onClick={() => {
                                        moderateActivityLog();
                                        setActivityLog(true);
                                        setFoodTable(false);
                                        setUserDetailsOpen(false);
                                    }}
                                    name={`Moderate Activity log`}
                                />
                            )}

                            {!userDetailsOpen && (
                                <Items
                                    onClick={() => {
                                        moderateUser();
                                        setFoodTable(false);
                                        setActivityLog(false);
                                    }}
                                    name={`Moderate user details`}
                                />
                            )}

                            {!foodTable && (
                                <Items
                                    onClick={() => {
                                        moderateFoodData();
                                        setActivityLog(false),
                                            setUserDetailsOpen(false);
                                    }}
                                    name={`Moderate food table`}
                                />
                            )}
                        </div>
                    </div>

                    {activityLog && !foodTable && !userDetailsOpen && (
                        <>
                            <div className="flex w-full justify-center">
                                <h1 className="font-semibold w-full mx-auto ml-14 text-lg text-center">
                                    Moderate Activity Log
                                </h1>
                                <button
                                    onClick={() => setActivityLog(false)}
                                    className="border border-black rounded-md mr-4  px-4"
                                >
                                    Exit
                                </button>
                            </div>

                            <div className=" w-[96%] rounded-md justify-center mx-auto text-center border border-black grid grid-cols-2">
                                <div>White List</div>
                                <div>Black List</div>
                                <div>
                                    {whitelist.map((e, index) => (
                                        <div
                                            key={index}
                                            onClick={removeWhiteList}
                                        >
                                            {e.ip}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    {blacklist.map((e, index) => (
                                        <div
                                            onClick={removeBlackList}
                                            key={index}
                                        >
                                            {e.ip}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full">
                                {ip.map((result, index) => (
                                    <div
                                        className="flex w-[96%] p-4 flex-col border m-1 mx-auto rounded-md shadow-[1px_1.5px_4px_3px] shadow-gray-400 text-center"
                                        key={index}
                                    >
                                        <div className="mb-2">
                                            Ip Address: {result}
                                        </div>
                                        <div className="mb-2">
                                            Total Requests Made:{" "}
                                            {filterIps(ip[index]).length}
                                        </div>
                                        <div className="flex justify-center">
                                            <button
                                                onClick={addToWhitelist}
                                                value={result}
                                                className="border mr-4 border-black rounded-md p-1"
                                            >
                                                White List
                                            </button>
                                            <button
                                                onClick={addToBlackList}
                                                value={result}
                                                className="border border-black rounded-md p-1"
                                            >
                                                Black List
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <AdminPannel
                                email={""}
                                ip={activityLogData.ip}
                                totalReqs={activityLogData.action}
                                dataType={"Activity Log"}
                                header1={"Email"}
                                header2={"Action"}
                                header3={"ip"}
                                header4={"Timestamp"}
                                button={"block"}
                                data={activityLogData.map((data) => (
                                    <>
                                        <div className="border-b border-r border-black break-words">
                                            {data.user}
                                        </div>
                                        <div className="border-b border-r border-black break-words">
                                            {data.action}
                                        </div>
                                        <div className="border-b border-r border-black break-words">
                                            {data.ip}
                                        </div>
                                        <div className="border-b border-r border-black break-words">
                                            {
                                                data.timeStamp
                                                    .replace("T", " ")
                                                    .split(".")[0]
                                            }
                                        </div>
                                        <div className="border-b border-black break-words">
                                            block
                                        </div>
                                    </>
                                ))}
                            />
                        </>
                    )}

                    {foodTable && !activityLog && !userDetailsOpen && (
                        <>
                            <button
                                className="border border-black p-2 rounded-md mt-3 w-11/12 font-semibold"
                                onClick={() =>
                                    setAddFood((prevState) => !prevState)
                                }
                            >
                                {!addFood ? "add Foods" : "close"}
                            </button>
                            {addFood && <CustomFoodOption />}

                            {!addFood && !foodConfirm && !edit && (
                                <div className="flex flex-col py-2 w-11/12">
                                    {foodData.map((e) => (
                                        <div
                                            key={e.id}
                                            className="flex my-2 font-semibold flex-col w-full border border-black rounded-md p-2"
                                        >
                                            <div>Food: {e.foodName}</div>
                                            <div>Per 100 Grams</div>
                                            <div>Calories: {e.calPer100}</div>
                                            <div>Protien: {e.protien}</div>
                                            <div>Fats: {e.fat}</div>
                                            <div>Carbs: {e.carbs}</div>
                                            <div>
                                                <button
                                                    onClick={selectedItem}
                                                    value={e.id}
                                                    className="p-2 w-[20%] mr-2 border border-black rounded-md"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={dF}
                                                    value={e.id}
                                                    className="p-2 w-[20%] mr-2 border border-black rounded-md"
                                                >
                                                    Delete {e.id}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {foodConfirm && (
                                <div className="flex w-10/12 flex-col border border-gray-50 rounded-md font-semibold shadow-lg p-2">
                                    Are you sure you want to delete this food
                                    item
                                    <div className="flex mx-auto justify-between">
                                        <button
                                            className="mt-5 mr-[4%] bg-[#1976d2] p-2 rounded-md w-16"
                                            onClick={deleteFood}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            className="mt-5 bg-red-600  p-2 rounded-md w-16"
                                            onClick={() =>
                                                setFoodConfirm(false)
                                            }
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>
                            )}
                            {edit && (
                                <EditFood
                                    idProp={itemInfo.foodID}
                                    foodProp={itemInfo.foodName}
                                    calsProp={itemInfo.calPer100}
                                    protienProp={itemInfo.protien}
                                    carbsProp={itemInfo.carbs}
                                    fatProp={itemInfo.fat}
                                    onClick={() => setEdit(false)}
                                />
                            )}
                        </>
                    )}

                    {userDetailsOpen && !foodTable && !activityLog && (
                        <div className="w-full text-center">
                            <h1>User Details table</h1>
                            {!selectedDetailsOpen && (
                                <div>
                                    {userDetails.map((info) => (
                                        <div onClick={editUser} key={info.id}>
                                            {info.email}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {selectedDetailsOpen && (
                                <>
                                    <form className="flex my-4 border border-black p-3  font-semibold  flex-col w-11/12 mx-auto text-left">
                                        <h1 className="mb-2 ">
                                            Edit User Details
                                        </h1>
                                        <label className="mb-1">Email:</label>
                                        <input
                                            className="mb-1 border indent-[2px]"
                                            type="text"
                                            name="email"
                                            placeholder={selectedDetails.email}
                                            value={formik.values.email}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.email &&
                                        formik.touched.email ? (
                                            <p className="text-red-600 mb-1">
                                                {formik.errors.email}
                                            </p>
                                        ) : null}

                                        <label className="my-1">Name:</label>
                                        <input
                                            className="mb-1 border indent-[2px]"
                                            type="text"
                                            name="name"
                                            placeholder={selectedDetails.name}
                                            value={formik.values.name}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.name &&
                                        formik.touched.name ? (
                                            <p className="text-red-600 mb-1">
                                                {formik.errors.name}
                                            </p>
                                        ) : null}

                                        <label className="my-1">
                                            User Type
                                        </label>
                                        <select
                                            className="mb-1 border indent-[2px]"
                                            type="text"
                                            name="userType"
                                            placeholder={JSON.stringify(
                                                selectedDetails.admin
                                            )}
                                            onChange={formik.handleChange}
                                            value={formik.values.admin}
                                            onBlur={formik.handleBlur}
                                        >
                                            <option value="default" disabled>
                                                Select User Type
                                            </option>
                                            <option value="false">
                                                Regular User
                                            </option>
                                            <option value="true">Admin</option>
                                        </select>
                                        {formik.errors.admin &&
                                        formik.touched.admin ? (
                                            <p className="text-red-600 mb-1">
                                                {formik.errors.admin}
                                            </p>
                                        ) : null}
                                        <div className="w-full flex">
                                            <button
                                                onClick={updateUser}
                                                className="py-2 w-[50%] my-2 border border-black rounded-md"
                                            >
                                                Submit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setSelectedDetailsOpen(
                                                        false
                                                    )
                                                }
                                                className="py-2 my-2 border w-[50%] border-black rounded-md ml-2"
                                            >
                                                cancel
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}

                            {selectedDetailsOpen && (
                                <div className="w-11/12 mx-auto border border-gray-50 shadow-lg rounded-md p-2 text-md font-semibold">
                                    <div key={selectedDetails.id}>
                                        <div>
                                            Email: {selectedDetails.email}
                                        </div>
                                        <div>
                                            Admin:{" "}
                                            {JSON.stringify(
                                                selectedDetails.admin
                                            )}
                                        </div>
                                        <div>Name: {selectedDetails.name}</div>
                                        <div className="flex ">
                                            <button
                                                className={`mx-auto p-2 rounded-md font-semibold  mt-5 bg-red-600`}
                                                onClick={() =>
                                                    setConfirmation(true)
                                                }
                                                value={selectedDetails.email}
                                            >
                                                Delete Account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {confirmation && (
                        <div className="flex w-10/12 flex-col border border-gray-50 rounded-md font-semibold shadow-lg p-2">
                            Are you sure you want to delete this Account? All
                            user data will be deleted and require them to reauth
                            through github
                            <div className="flex mx-auto justify-between">
                                <button
                                    className="mt-5 mr-[4%] bg-[#1976d2] p-2 rounded-md w-16"
                                    onClick={deleteUser}
                                >
                                    Yes
                                </button>
                                <button
                                    className="mt-5 bg-red-600  p-2 rounded-md w-16"
                                    onClick={() => setConfirmation(false)}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

const Items = ({ icon, onClick, name }) => {
    return (
        <section
            onClick={onClick}
            className="relative flex items-center justify-center font-medium my-1 shadow-[1px_1.5px_4px_3px] shadow-gray-400
              bg-white h-16 min-h-[60px] w-full rounded-md text-2xl hover:bg-[#1976d2] hover:text-white 
              dark:bg-[#121212] dark:shadow-slate-500 dark:shadow-sm dark:hover:bg-purple-900 "
        >
            <p>{name}</p>
        </section>
    );
};
