'use client';
import React, { useState } from 'react';
import { treeData } from '@/lib/constants';

const TreeComponent = ({ onCompanySelect, identities = [] }) => {

    const [expandedCompanies, setExpandedCompanies] = useState([]);

    const handleCompanyClick = (companyIndex) => {
        setExpandedCompanies((prevExpanded) => {
            if (prevExpanded.includes(companyIndex)) {
                return prevExpanded.filter((index) => index !== companyIndex);
            } else {
                return [...prevExpanded, companyIndex];
            }
        });
        onCompanySelect(treeData[companyIndex]);
    };

    const isCompanyConnected = (connection) => {
        return identities ? identities.some(identity => identity.connection === connection) : false;
    };

    return (
        <div className="space-y-4 font-thin">
            {treeData.map((item, index) => (
                <div key={index} className="pl-2">
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleCompanyClick(index)}>
                        <img src={item.logo} alt={`${item.company} logo`} className="w-6 h-6" />
                        <div className="flex items-center justify-between w-full">
                            <h2>{item.company}</h2>
                            <span className={`w-2 h-2 rounded-sm ${isCompanyConnected(item.connection) ? 'bg-green-500' : 'bg-gray-700'}`}></span>
                        </div>
                    </div>
                    {/* Ignore services for now. Let's just connect the main provider */}
                    {/* <div className={`overflow-hidden transition-all duration-700 ease-in-out ${expandedCompanies.includes(index) ? "max-h-screen" : "max-h-0"}`} >
                        <ul className="pl-6 mt-2 space-y-2">
                            {item.services.map((service, idx) => (
                                <li key={idx} className="text-sm flex items-center">
                                    <span className="inline-block w-2 h-0.5 rounded-full bg-green-500 mr-2"></span>
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div> */}
                </div>
            ))}
            <div className="pl-2">
                <div className="flex items-center space-x-3 text-gray-500">
                    <div className="w-6 h-6"></div>
                    <div className="flex items-center justify-between w-full">
                        <h2>More coming soon...</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TreeComponent;
