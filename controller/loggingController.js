// const loggingModel = require('../model/loggingModel')
// import {getSession} from 'next-auth/react'

// // const addLog = async (req, res) => {

// //     let action = req.method
// //     const session = await getSession({ req })
// //     let request = 1

// //     const forwarded = req.headers["x-forwarded-for"]
// //     const ip = forwarded ? forwarded.split(/, /)[0] : req.ip || req.connection.remoteAddress
   
// //     loggingModel.addNewLog(
// //         session.user.email,
// //         session.user.name,
// //         action,
// //         ip, 
// //         request
// //     )
// // }

// const checkLog = async (req, res) => {

//     const session = await getSession({ req })
//     console.log(session)
//     console.log('lgoapi')

//     let isLimited = await loggingModel.checkTotalRequests(session.user.email)
//         .then((results) => {
//         console.log('inner log api')

//             console.log(results.length)
//             if(results.length > 200) { 
//                 console.log('in here')
//             } 
//             else {
//                 let action = req.method
//                 let request = 1
//                 console.log('out here')
                
//                 const forwarded = req.headers["x-forwarded-for"]
//                 const ip = forwarded ? forwarded.split(/, /)[0] : req.ip || req.connection.remoteAddress
            
//                 loggingModel.addNewLog(
//                     session.user.email,
//                     session.user.name,
//                     action,
//                     ip, 
//                     request
//                 )
                
//             } 
//         })
//         .catch((error) => {
//             res.status(500) 
//             console.log(error)
//     })
// }

// export { checkLog }