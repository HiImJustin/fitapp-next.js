import handler from '../handler'
import { addLog, checkLog } from '../../../controller/loggingController'
const userModel = require('../../../model/userModel')

export default handler
.get(async(req, res) => {
    userModel.getUsers()
    .then((results) => {
        console.log(results)
        console.log('usersApi')
        res.status(200).json(results)
    })
})
.post(async(req, res) => {
    // console.log(res.statusCode)
    // if(res.statusCode === 401) {
    //     console.log(res.statusCode)
    //     res.status(401).json('too many requests')
    //     return;
    // } else {
        let user = req.body
        userModel.addUserModel(
            user.age,
            user.height,
            user.weight,
            user.sex
        )
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json(error)
        })
    // }
})
