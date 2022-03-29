import nc from 'next-connect'
import { addExercises, getExercises } from '../../controller/exerciseController'

const handler = nc();

handler.get(getExercises)

handler.post(addExercises)

export default handler