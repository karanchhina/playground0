import { auth0 } from "@/lib/auth0"

const Navbar = async () => {
    
    const session = await auth0.getSession()

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-20">
            <div className="flex w-full mx-auto px-4">
                <div className="flex flex-row flex-grow justify-between h-12">
                    <div className="flex">
                        <a href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-medium font-mono text-gray-800">
                                Playground0
                            </span>
                        </a>
                    </div>
                    {session ? (
                        <>
                            <div className="flex items-center gap-x-2 text-md text-gray-800 font-mono">
                                [<a href="/" className="px-2 py-1 flex flex-row items-center gap-x-1 shadow-md hover:underline">
                                    Chat
                                </a>]
                                [<a href="/profile" className="px-2 py-1 flex flex-row items-center gap-x-1 shadow-md hover:underline">
                                    Profile
                                </a>]
                                [<a href="/auth/logout" className="px-2 py-1 flex flex-row items-center gap-x-1 shadow-md hover:underline">
                                    Logout
                                </a>]
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center">
                            <a href="/auth/login" className="px-3 py-2 rounded-md text-lg">
                                Sign up
                            </a>
                            <a href="/auth/login" className="px-3 py-2 rounded-md text-lg">
                                Log in
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar

