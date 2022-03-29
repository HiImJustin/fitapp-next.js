import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

//https://next-auth.js.org/getting-started/upgrade-v4
//Login /api/auth/login
//logout /api/auth/signout
export default NextAuth({
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            synchronize: false,
        }),
    ],
    secret: process.env.JWT_SECRET,
})