import React from 'react';

const ProfileGeneral = ({ user }) => {
    return (
        <div className='rounded-xl px-10 py-5 mx-10 bg-white border border-gray-200'>
            <h1 className="text-3xl font-bold pb-2">Profile</h1>
            <div className="text-xl font-extralight pb-5">Your read only profile</div>

            <div className="grid grid-cols-1 md:grid-cols-[auto,auto,auto] gap-x-10 gap-y-2 mb-8">
                <div className='row-span-2 flex justify-center items-center'>
                    <img src={user.picture} alt="Profile" className="rounded-2xl w-24 h-24 border-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium uppercase">Name</label>
                    <input type="text" value={user.name || ''} readOnly className="mt-1 block w-full rounded-md p-1 border border-gray-300 bg-transparent text-gray-800" />
                </div>
                <div>
                    <label className="block text-sm font-medium uppercase">Email</label>
                    <input type="text" value={user.email || ''} readOnly className="mt-1 block w-full rounded-md p-1 border border-gray-300 bg-transparent text-gray-800" />
                </div>
                <div>
                    <label className="block text-sm font-medium uppercase">Nickname</label>
                    <input type="text" value={user.nickname || ''} readOnly className="mt-1 block w-full rounded-md p-1 border border-gray-300 bg-transparent text-gray-800" />
                </div>
                <div>
                    <label className="block text-sm font-medium uppercase">User ID</label>
                    <input type="text" value={user.sub} readOnly className="mt-1 block w-full rounded-md p-1 border border-gray-300 bg-transparent text-gray-800" />
                </div>
            </div>
        </div>
    );
};

export default ProfileGeneral;