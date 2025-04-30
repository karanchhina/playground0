'use client';

import { Info } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ session }) => {
    const [showAbout, setShowAbout] = useState(false);
    
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
                    <div className="flex items-center gap-x-4">
                        {session ? (
                            <>
                                <div className="flex items-center gap-x-2 text-md text-gray-800 font-mono">
                                    [<a href="/" className="px-2 py-1 flex flex-row items-center gap-x-1 hover:underline">
                                        Chat
                                    </a>]
                                    [<a href="/profile" className="px-2 py-1 flex flex-row items-center gap-x-1 hover:underline">
                                        Profile
                                    </a>]
                                    [<a href="/auth/logout" className="px-2 py-1 flex flex-row items-center gap-x-1 hover:underline">
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
                        <button 
                            onClick={() => setShowAbout(true)}
                            className="text-gray-600 hover:text-gray-800 transition-colors"
                            title="About"
                        >
                            <Info className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* About Modal */}
            {showAbout && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
                    <div className="p-6 border-2 border-gray-300 w-1/2 min-w-[600px] max-w-2xl bg-white rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">About Playground0</h2>
                        <div className="space-y-4 text-sm">
                            <p className="text-gray-700">
                                Playground0 is a demo app showcasing Auth0's integration capabilities with various third-party services using Auth for GenAI.
                            </p>
                            <p className="text-gray-700">
                                Checkout the <a href="https://auth0.com/ai" className="text-blue-500 hover:underline">auth0.com/ai</a> for SDKs, quickstarts, and more.
                            </p>
                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="font-semibold mb-2">Features:</h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-700">
                                    <li>Account linking with social and OIDC connections</li>
                                    <li>Support for Salesforce, GitHub, Google Calendar, Spotify, and more</li>
                                    <li>Real-time chat interface backed by an LLM</li>
                                    <li>Profile management example</li>
                                    <li>Coming soon: Unlink and relink accounts</li>
                                    <li>Coming soon: Support for more services</li>
                                </ul>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="font-semibold mb-2">Credits:</h3>
                                <p className="text-gray-700">
                                    Built with Next.js, Vercel AI SDK, Auth0 Auth for GenAI, and various third-party APIs. Icons by Lucide and Heroicons.
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button 
                                onClick={() => setShowAbout(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar

