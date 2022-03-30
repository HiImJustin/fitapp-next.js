import nc from 'next-connect'
import { addExercises, getExercises } from '../../controller/exerciseController'
import { sendRequest } from '../../middleware/limiter';

const handler = nc();

handler.get(getExercises)

handler.post(addExercises, )
sendRequest
export default handler