import { withRouter } from "next/router"

const CustomLink = ({ router, href, children }) => {

    const handleClick = event => {
        event.preventDefault();
        router.push(href)
    }

    return <section>
        <a href={href} onClick={handleClick} 
        style={{
            textDecoration: "none",
        }}>
            {children}
        </a>
        </section>
}
export default withRouter(CustomLink)