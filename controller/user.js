import { executeQuery } from '../config/db';

const getUsers = async (req, res) => {
    let userData=await executeQuery("select * from users", []);
    res.send(userData)
};

const addUser = async (req, res) => {
    console.log(req.body);
    let age = req.body.age
    let height = req.body.height
    let weight = req.body.weight
    let gender = req.body.gender
    let tdee = req.body.tdee
    try {
    let userData= await executeQuery('Insert into users(age, height, weight, gender, tdee) values(?,?,?,?,?)',[ age, height, weight, gender, tdee])
       res.status(201).json(userData) 
    } catch(err) {
        res.status(400).json(err)
    }
}
export { getUsers, addUser }