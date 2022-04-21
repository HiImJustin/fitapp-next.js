import Layout from "../components/layout/layout";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <ThemeProvider enableSystem={true} attribute="class">
            <SessionProvider session={session} refetchInterval={5 * 60}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SessionProvider>
        </ThemeProvider>
    );
}

export default MyApp;
