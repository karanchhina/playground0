import React from "react";

export const Table = ({ data, className = "" }) => {
    if (!data || (Array.isArray(data) && data.length === 0)) {
        return <div className="text-gray-400">No data to display.</div>;
    }

    if (!Array.isArray(data)) {
        // Print the JSON object directly
        return (
            <pre className={`p-3 bg-white text-gray-800 border border-gray-200 ${className}`}>
                {JSON.stringify(data, null, 2)}
            </pre>
        );
    } else {
        // Handle the case where data is an array
        const headers = Object.keys(data[0]);

        return (
            <div>
                <table className={`min-w-full text-sm border border-gray-200 ${className}`}>
                    <thead>
                        <tr className="bg-gray-50">
                            {headers.map((key) => (
                                <th
                                    key={key}
                                    className="px-3 py-2 text-left border-b border-gray-200 capitalize"
                                >
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="bg-white">
                                {headers.map((colKey) => (
                                    <td key={colKey} className="px-3 py-2 border-b border-gray-200 align-top">
                                        {typeof row[colKey] === "object" && row[colKey] !== null ? (
                                            <ul className="list-none list-inside text-sm space-y-1">
                                                {Object.entries(row[colKey]).map(([subKey, subValue]) => (
                                                    <li key={subKey}>
                                                        {String(subValue)}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            String(row[colKey])
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* <pre className={`mt-4 p-3 bg-white text-gray-800 border border-gray-200 ${className}`}>
                    {JSON.stringify(data, null, 2)}
                </pre> */}
            </div>
        );
    }
};
