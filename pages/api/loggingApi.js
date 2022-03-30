import nc from 'next-connect'
import { addLog } from '../../controller/loggingController'
const handler = nc();

handler.post(addLog)

export default handler