"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Course_view() {
    const [courses, setCourses] = useState([]);

    const [pageNumber, setPageNumber] = useState(1); // वर्तमान पेज नंबर को ट्रैक करता है (शुरुआत में 1)
    const [totalLen, setTotalLen] = useState(0); // कुल रिकॉर्ड की संख्या को स्टोर करता है
    const [limit, setLimit] = useState(5); //प्रत्येक पेज पर कितने रिकॉर्ड दिखाने हैं

    const [loading, setloading] = useState(false) // loading dekh ne ke liye

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
        setloading(true)
        axios
            .post("https://node-js-pagination-pyo7.onrender.com/api/backend/courses/view", {
                page: pageNumber,
                limit: limit,
            })
            .then((response) => {
                if (response.data.status === true) {
                    setCourses(response.data.data);
                    setloading(false)
                    setTotalLen(response.data.pagination.totalRecords || 0);
                } else {
                    setCourses([]);
                    setTotalLen(0);
                }
            })
            .catch((err) => {
                setError(err.message);
                setloading(false); // इस लाइन को जरूर जोड़ें

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
                                        {
                                            loading && <div role="status" className="flex justify-center items-center">
                                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        }


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
                                className={`flex  h-[30px] items-center justify-centertext-xs px-3 py-1.5 rounded border bg-green-600 text-white border-green-700transition-colors duration-200 ${pageNumber === 1 ? "hidden" : ""
                                    }`}
                                title="First Page"
                                onClick={() => changePageNumber("First")}
                                disabled={pageNumber === 1}
                            >
                                First
                            </button>
                            {/* Previous Button */}

                            <button className={`flex  h-[30px] items-center justify-centertext-xs px-3 py-1.5 rounded border bg-green-600 text-white border-green-700transition-colors duration-200 ${pageNumber === 1 || pageNumber === 2 ? "hidden" : ""
                                }`}
                                title="Previous Page"
                                onClick={() => changePageNumber("Previous")}
                                disabled={pageNumber === 1 || pageNumber === 2}
                            >
                                Previous
                            </button>
                            {/* Next Button */}
                            <button
                                className={`flex  h-[30px] items-center justify-center text-xs px-3 py-1.5 rounded border bg-green-600 text-white border-green-700 transition-colors duration-200 ${pageNumber === Math.ceil(totalLen / limit)
                                    ? "hidden" : ""}`}
                                title="Next Page"
                                onClick={() => changePageNumber("Next")}
                                disabled={pageNumber === Math.ceil(totalLen / limit)}
                            >
                                Next
                            </button>

                            {/* Last Button */}
                            <button
                                className={`flex  h-[30px] items-center justify-centertext-xs px-3 py-1.5 rounded border bg-green-600 text-white border-green-700transition-colors duration-200 ${pageNumber === Math.ceil(totalLen / limit) ? "hidden" : ""
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
