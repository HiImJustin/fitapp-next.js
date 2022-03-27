import mysql from 'mysql2'

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

pool.getConnection((err) => {
    if(err) {
        console.log(err + "error")
    }
    console.log('Connected to db')
});

const query =(query, arraParams) => {
    return new Promise((resolve, reject) => {
        try {
            pool.query(query, arraParams, (err, data) => {
                if(err) {
                    console.log('error in query')
                    reject(err)
                }
                resolve(data)
            });
        } catch(err) {
            reject(err);
        }
    })
}

module.exports = { query }