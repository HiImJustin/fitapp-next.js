import Home from '../../components/home/home'
import Link from "next/link"
import { useSession } from "next-auth/react"




function HomePage({ ip }) {

  
  const { data: session, status } = useSession()
  return (
      
    <>
    {
      session &&
      <div>singed in as {session.user.email} ip: {ip}
      <button><Link href="/admin">admin page</Link></button></div>
      
    }
            {/* <pre>{JSON.stringify(users, null, 4)}</pre> */}
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
    const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
    console.log(ip)
    return {props: {ip}}
  }
  