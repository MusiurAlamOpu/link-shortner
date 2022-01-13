
import Link from "next/link";
import navStyles from "../styles/Navbar.module.css";

const Navbar = () => {
    return (
        <nav className={`container-g ${navStyles.navbar}`}>

            <Link href="/" passHref><p>LINK<span>SHORTNER</span></p></Link>

            <ul>
                <Link href="/" passHref><li>Shortner</li></Link>
                <Link href="/about" passHref><li>About</li></Link>
                <Link href="/contact" passHref><li>Contact</li></Link>
            </ul>

        </nav>
    )
}

export default Navbar;