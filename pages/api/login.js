const pool = require('../lib/db')

const yes = () => {
    pool.getConnection( ( err, conn) => {
        if (err) throw err;

        const qry = "SELECT * FROM users;"

        conn.query(qry, (err, res) => {
            conn.release();
            if (err) throw err;
            console.log(res)
        })
    })
}
export default yes;
  