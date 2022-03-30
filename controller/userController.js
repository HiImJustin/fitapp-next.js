const userModel = require('../model/userModel')
import { getUsers } from '../model/userModel'
import { addLog } from './loggingController'

const getAllUsers = (req, res) => {
    getUsers()
    .then((results) => {
        res.status(200).json(results)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json('bad')
    })
}

const addUser = (req, res) => {

    let user = req.body
    
    addLog(req, res)
    console.log(req.body);
    
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
            res.status(500).json('nope ' + error)
        })
}
export { getAllUsers, addUser }


