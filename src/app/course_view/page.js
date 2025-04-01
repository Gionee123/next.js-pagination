"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Course_view() {
    const [courses, setCourses] = useState([]);

    const [pageNumber, setPageNumber] = useState(1); // वर्तमान पेज नंबर को ट्रैक करता है (शुरुआत में 1)
    const [totalLen, setTotalLen] = useState(0); // कुल रिकॉर्ड की संख्या को स्टोर करता है
    const [limit, setLimit] = useState(5); //प्रत्येक पेज पर कितने रिकॉर्ड दिखाने हैं

    let changePageNumber = (para) => {
        if (para === "First") {
            // Go to first page
            setPageNumber(1); // पहले पेज पर जाओ
        } else if (para === "Previous") {
            // Go to previous page, but don't go below 1
            setPageNumber(pageNumber - 1); // पिछले पेज पर जाओ
        } else if (para === "Next") {
            setPageNumber(pageNumber + 1); // अगले पेज पर जाओ
        } else if (para === "Last") {
            // Go to last page
            setPageNumber(Math.ceil(totalLen / limit)); // आखिरी पेज पर जाओ
        } else {
            console.log("Unknown pagination action"); // अगर गलत इनपुट हो तो एरर दिखाओ
        }
    };
    useEffect(() => {
        axios
            .post("https://node-js-pagination-pyo7.onrender.com/api/backend/courses/view", {
                page: pageNumber,
                limit: limit,
            })
            .then((response) => {
                if (response.data.status === true) {
                    setCourses(response.data.data);
                    setTotalLen(response.data.pagination.totalRecords || 0);
                } else {
                    setCourses([]);
                    setTotalLen(0);
                }
            })
            .catch((err) => {
                setError(err.message);
            });
    }, [pageNumber, limit]); // जब यह वैल्यू बदलेगी तो API कॉल होगी
    return (
        <div className="flex justify-center">
            <ToastContainer position="top-right" autoClose={100} />

            <div className="w-full p-[12px]">
                <div className="bg-white shadow overflow-hidden rounded-lg">

                    <h1 className="text-center text-[blue] text-[30px] py-[5px]">Pagination node.js api</h1>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    name
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    image
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    price
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    duration
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    description
                                </th>


                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {courses.length > 0 ? (
                                courses.map((value, index) => (
                                    <tr key={index}>
                                        <td></td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                                            {(pageNumber - 1) * limit + index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                            <div className="w-[100px] overflow-auto ">
                                                {value.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                            {value.image}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                            ${value.price}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                            ${value.duration}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                            ${value.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                                            ${value.order}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">

                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-center">

                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center py-8 text-gray-500">
                                        No courses found. Add button new course to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/* //pagination */}
                    <div className="container mx-auto px-4">
                        <nav className="flex gap-[10px]  justify-between md:justify-center items-center ">
                            {/* First Button */}
                            <button
                                className={`flex items-center justify-centertext-xs px-3 py-1.5 rounded border bg-green-600 text-white border-green-700transition-colors duration-200 ${pageNumber === 1 ? "hidden" : ""
                                    }`}
                                title="First Page"
                                onClick={() => changePageNumber("First")}
                                disabled={pageNumber === 1}
                            >
                                First
                            </button>
                            {/* Previous Button */}

                            <button className={`flex items-center justify-centertext-xs px-3 py-1.5 rounded border bg-green-600 text-white border-green-700transition-colors duration-200 ${pageNumber === 1 ? "hidden" : ""
                                }`}
                                title="Previous Page"
                                onClick={() => changePageNumber("Previous")}
                                disabled={pageNumber === 1}
                            >
                                Previous
                            </button>
                            {/* Next Button */}
                            <button
                                className={`flex items-center justify-center text-xs px-3 py-1.5 rounded border bg-green-600 text-white border-green-700 transition-colors duration-200 ${pageNumber === Math.ceil(totalLen / limit)
                                    ? "hidden" : ""}`}
                                title="Next Page"
                                onClick={() => changePageNumber("Next")}
                                disabled={pageNumber === Math.ceil(totalLen / limit)}
                            >
                                Next
                            </button>

                            {/* Last Button */}
                            <button
                                className={`flex items-center justify-centertext-xs px-3 py-1.5 rounded border bg-green-600 text-white border-green-700transition-colors duration-200 ${pageNumber === Math.ceil(totalLen / limit) ? "hidden" : ""
                                    }`}
                                title="Last Page"
                                onClick={() => changePageNumber("Last")}
                                disabled={pageNumber === Math.ceil(totalLen / limit)}
                            >
                                Last
                            </button>
                        </nav>
                    </div>
                    {/* //pagination */}
                </div>
            </div>
        </div>
    );
}
