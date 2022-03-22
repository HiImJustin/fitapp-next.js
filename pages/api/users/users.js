import nc from "next-connect"
import { getUsers, addUser } from "../../../controller/user";

const handler=nc();
handler.get(getUsers)
handler.post(addUser)
export default handler