const loggingModel = require('../model/loggingModel')
import { getSession } from 'next-auth/react'
const addLog = async (req, res) => {
    
    let action = req.method
    const session = await getSession({ req })
    console.log(session)
    
    const forwarded = req.headers["x-forwarded-for"]
    const ip = forwarded ? forwarded.split(/, /)[0] : req.ip || req.connection.remoteAddress

    loggingModel.addNewLog(
        session.user.email,
        session.user.name,
        action,
        ip
    )
}

export { addLog }