import handler from '../handler'
import { addLog, checkLog } from '../../../controller/loggingController'
const userModel = require('../../../model/userModel')

export default handler
.post(async(req, res) => {
        let user = req.body
        userModel.addUserModel(
            user.age,
            user.height,
            user.weight,
            user.sex
        )
        .then((results) => {
            if(results.affectedRows > 0) {
                console.log(results)
                res.status(201).json(results)
            } else {
                res.stauts(404).json('user not created')
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json(error)
        })
    // }
})
