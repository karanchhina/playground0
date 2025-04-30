import { auth0 } from "@/lib/auth0"
import Navbar from "./Navbar"

const NavbarWrapper = async () => {
    const session = await auth0.getSession();
    return <Navbar session={session} />
}

export default NavbarWrapper 