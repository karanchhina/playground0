'use client';

import { useState } from 'react';
import ChatBox from './ChatBox';
import TreeComponent from './TreeComponent';
import { linkAccount } from '../actions';
import { CustomComponents } from '@/lib/constants';

const linkSocialAccount = async (connection) => {
    await linkAccount(connection);
}

const ChatHome = ({ session, identities = [] }) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const [selectedCompany, setSelectedCompany] = useState(null);

    const closeModal = () => {
        setSelectedCompany(null);
    };

    const matchingIdentity = selectedCompany ? identities.find(identity => identity.connection === selectedCompany.connection) : null;


    return (
        <div className='flex flex-col w-full py-4 mx-auto stretch h-screen pt-16 bg-white'>

            {/* Modal */}
            {selectedCompany && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <div className="p-6 border-2 border-gray-300 w-1/2 min-w-[600px] max-w-2xl bg-white rounded-lg">
                        <img src={selectedCompany.logo} alt={`${selectedCompany.company} logo`} className="w-16 mb-4" />
                        <h2 className="font-bold mb-4">{selectedCompany.company}</h2>
                        <p className="mb-4">{selectedCompany.description}</p>
                        <p className="mb-4 text-sm text-gray-600">Auth0 connection name: {selectedCompany.connection}</p>

                        <div className="flex justify-between">
                            {matchingIdentity ? (
                                <>
                                    <form action={() => null}>
                                        <button disabled className="opacity-50 cursor-not-allowed" title="Coming soon">
                                            <div className="flex items-center gap-x-2">
                                                [<span className="px-2 py-1 flex flex-row items-center gap-x-1">Unlink Account</span>]
                                            </div>
                                        </button>
                                    </form>
                                    <form action={() => linkSocialAccount(selectedCompany.connection)}>
                                        <button disabled className="opacity-50 cursor-not-allowed" title="Coming soon">
                                            <div className="flex items-center gap-x-2">
                                                [<span className="px-2 py-1 flex flex-row items-center gap-x-1 hover:underline">Relink Account</span>]
                                            </div>
                                        </button>
                                    </form>

                                </>
                            ) : (
                                <form action={() => linkSocialAccount(selectedCompany.connection)}>
                                    <button>
                                        <div className="flex items-center gap-x-2">
                                            [<span className="px-2 py-1 flex flex-row items-center gap-x-1 hover:underline">Link Account</span>]
                                        </div>
                                    </button>
                                </form>
                            )}
                            <button onClick={closeModal}>
                                <div className="flex items-center gap-x-2">
                                    [<span className="px-2 py-1 flex flex-row items-center gap-x-1 hover:underline">Close</span>]
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sidebar Drawer */}
            <div className={`fixed left-0 top-0 z-10 w-64 h-full transform bg-white  
                ${isDrawerOpen ? "translate-x-0" : "-translate-x-56"} transition-transform duration-300 ease-in-out`}
            >
                <div className="flex flex-row pt-12 h-screen">
                    <div className="p-4 w-full max-h overflow-y-auto">
                        <p className="ml-2 mb-3 font-semibold">Connected Apps</p>
                        <TreeComponent onCompanySelect={setSelectedCompany} identities={identities} />
                    </div>
                    <div className="flex bg-gray-100 cursor-pointer p-2 items-center" onClick={toggleDrawer}>
                        {
                            isDrawerOpen ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#4b5563" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#4b5563" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                </svg>
                        }
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 flex-row bg-white transition-all duration-300 ease-in-out ${isDrawerOpen ? "ml-60 mr-4" : "mx-4"}`} >
                <ChatBox session={session} />
            </div>

        </div>
    );
};

export default ChatHome;
