import { Icons } from '@/lib/constants';
import React from 'react';

const Landing = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen fixed top-0 left-0 right-0 bottom-0 bg-white z-30 text-gray-800 font-mono">
            <pre className="text-xs mb-4">
                ██████╗  ██╗          █╗   ██╗   ██╗  ██████╗  ██████╗   ██████╗  ██╗   ██╗ ███╗   ██╗ ██████╗    █████╗ <br />
                ██╔══██╗ ██║         ███║  ╚██╗ ██╔╝ ██╔════╝  ██╔══██╗ ██╔═══██╗ ██║   ██║ ████╗  ██║ ██╔══██╗  █╔═══██╗<br />
                ██████╔╝ ██║        █   █║  ╚████╔╝  ██║  ███╗ ██████╔╝ ██║   ██║ ██║   ██║ ██╔██╗ ██║ ██║  ██║  █║ ██ █║<br />
                ██╔═══╝  ██║       ██╔█╗██║  ╚██╔╝   ██║   ██║ ██╔██╗   ██║   ██║ ██║   ██║ ██║╚██╗██║ ██║  ██║  █║██  █║<br />
                ██║      ███████╗ ██     ██║  ██║    ╚██████╔╝ ██║╚██╗  ╚██████╔╝ ╚██████╔╝ ██║ ╚████║ ██████╔╝  ╚█████╔╝<br />
                ╚═╝      ╚══════╝ ╚═      ═╝  ╚═╝     ╚═════╝  ╚═╝ ╚═╝   ╚═════╝   ╚═════╝  ╚═╝  ╚═══╝ ╚═════╝    ╚════╝ <br />
            </pre>
            {/* <h1 className="text-5xl font-light mb-4 py-1 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-200 font-mono">Playground0</h1> */}
            <h2 className="mb-6 text-3xl font-extralight text-center w-3/5">Auth for GenAI Playground</h2>

            <div className="flex flex-col md:flex-row bg-gray-100 p-2 rounded-lg text-center w-3/5 max-w-2xl">
                <div className="w-full md:w-1/2 p-2 flex items-center justify-center">
                    <ul className="list-disc list-outside text-xl text-left font-light">
                        <li>Social connections</li>
                        <li>OIDC connections</li>
                        <li>And more!</li>
                    </ul>
                </div>
                <div className="w-full md:w-1/2 p-2 flex items-center justify-center text-md text-gray-800 font-mono">
                    [ <a href="/auth/login" className=" text-xl py-2 px-4 rounded-md hover:underline">
                        Login to get started
                    </a> ]
                </div>
            </div>
            <footer className="flex absolute bottom-0 w-full justify-center py-2">
                <Icons.Auth0Icon />
            </footer>
        </div>
    );
};

export default Landing;