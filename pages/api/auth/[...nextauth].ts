// import NextAuth from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "../../../lib/prisma";

// //https://next-auth.js.org/getting-started/upgrade-v4

// export default NextAuth({
//     providers: [
//         GitHubProvider({
//             clientId: process.env.GITHUB_ID,
//             clientSecret: process.env.GITHUB_SECRET,
//             synchronize: false,
//         }),
//         //     CredentialsProvider({
//         //         name: "credentials",
//         //         credentials: {
//         //             email: { label: "username", type: "email" },
//         //             password: { label: "password", type: "password" },
//         //         },
//         //         async authorize(credentials, req) {
//         //             const res = await fetch(
//         //                 `${process.env.NEXT_PUBLIC_API_URL}/usersApi`,
//         //                 {
//         //                     method: "POST",
//         //                     headers: {
//         //                         "Content-type": "application/json",
//         //                     },
//         //                     body: JSON.stringify(credentials),
//         //                 }
//         //             );
//         //             let user = await res.json();
//         //             if (
//         //                 credentials.email === user.email &&
//         //                 credentials.password === user.password
//         //             ) {
//         //                 return (user = {
//         //                     id: 2,
//         //                     email: user.email,
//         //                     name: user.userType,
//         //                 });
//         //             }
//         //             return console.log("bad");
//         //         },
//         //     }),
//     ],
//     adapter: PrismaAdapter(prisma),
//     secret: process.env.SECRET,
//     // callbacks: {
//     //     jwt: async ({ token, user }) => {
//     //         // first time jwt callback is run, user object is available
//     //         if (user) {
//     //             token.id = user.id;
//     //         }
//     //         return token;
//     //     },
//     //     session: ({ session, token }) => {
//     //         // if there is a session, add the token to it
//     //         if (token) {
//     //             session.id = token.id;
//     //         }
//     //         return session;
//     //     },
//     // },
//     // secret: process.env.JWT_SECRET,
//     // jwt: {
//     //     secret: process.env.JWT_SECRET,
//     //     encryption: true,
//     // },
// });

import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";

// const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
// export default authHandler;

// const options = {
//     providers: [
//         GitHubProvider({
//             clientId: process.env.GITHUB_ID,
//             clientSecret: process.env.GITHUB_SECRET,
//         }),
//     ],
//     adapter: PrismaAdapter(prisma),
//     secret: process.env.SECRET,
// };

const prisma = new PrismaClient();

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    secret: process.env.SECRET,
});
