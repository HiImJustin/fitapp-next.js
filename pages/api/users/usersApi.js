const userModel = require('../../../model/userModel')
const db = require('../../../config/db')
import handler from '../handler'

export default handler
.get(async(req, res) => {
    userModel.getUsers()
    .then((results) => {
        res.status(200).json(results)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json(error)
    })
})
.post(async (req, res) => {
    let login = req.body
    userModel.getUserByUsername(login.email)
        .then((results) => {
            console.log(results[0])
            if (results) {
                res.status(200).json(results[0])
            } else {
                res.status(400).json("wrong username or password")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json('failed to login, query error')
        })
})


