import Home from '../../components/home/home'
// const db = require('../../config/db')

function HomePage({ headers, users }) {
    console.log(headers)
    return (
        <>
            <pre>{JSON.stringify(users, null, 4)}</pre>
            <Home />
        </>
    )
}
export default HomePage;

// export async function getServerSideProps() {
//     const users = await db.query('Select * from users')
//     return {props: {users}}
// }

  export async function getServerSideProps({ req }) {

    const forwarded = req.headers["x-forwarded-for"]
    const headers = forwarded ? forwarded.split(/, /)[0] : req.ip || req.connection.remoteAddress
    return {
      props: {
        headers
      },
    }
  } 
