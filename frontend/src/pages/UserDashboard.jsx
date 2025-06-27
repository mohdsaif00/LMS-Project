
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function UserDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard'); // default tab

    return (
        <>
            <nav className="w-full bg-white p-2 ">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <Link to="#">
                        <img
                            src="https://cdn-editing-temp.picsart.com/editing-temp-landings/c4e056b6-23b3-41d0-8200-93f445bac86c.png" alt="logo" className="w-24 sm:w-32" />
                    </Link>
                    <div className="bg-sky-100 p-2 rounded-full">
                        <img src="https://icon-library.com/images/icon-of-person/icon-of-person-8.jpg" className="w-8 h-8" />
                    </div>
                </div>
            </nav>
            <section className=" flex justify-center p-1 min-h-screen">
                <div className="bg-gray-100 flex w-full max-w-screen-xl">
                    <div className="w-56 bg-white shadow-md pt-4">
                        <nav className="flex flex-col justify-center gap-4 text-gray-700 font-medium">
                            <div onClick={() => setActiveTab('dashboard')} className={`flex justify-center p-2 cursor-pointer ${activeTab === 'dashboard' ? 'bg-blue-100' : ''
                                }`}>
                                <button
                                    className="flex items-center gap-2" >
                                    <img
                                        src="https://cdn-icons-png.freepik.com/512/7854/7854804.png"
                                        alt="Dashboard Icon" className="w-6 h-6" />
                                    Dashboard
                                </button>
                            </div>

                            <div onClick={() => setActiveTab('addCourse')} className={`flex justify-center p-2 cursor-pointer ${activeTab === 'addCourse' ? 'bg-blue-100' : ''
                                }`}>
                                <button className="flex items-center gap-2" >
                                    <img
                                        src="https://uploads.onecompiler.io/42zhuec4k/43nwqqfqs/add-post-icon-line-icon-vector.jpg"
                                        alt="Add course Icon" className="w-5 h-5"
                                    /> Add Course
                                </button>
                            </div>

                            <div onClick={() => setActiveTab('myCourses')} className={`flex justify-center p-2 cursor-pointer ${activeTab === 'myCourses' ? 'bg-blue-100' : ''
                                }`}>
                                <button className="flex items-center gap-2">
                                    <img
                                        src="https://icons.veryicon.com/png/o/miscellaneous/personal-center-1/real-name-authentication-22.png"
                                        className="w-5 h-6" /> My Courses
                                </button>
                            </div>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <main className="flex-1 p-6 bg-gray-100">
                        {activeTab === 'dashboard' && (
                            <>
                                <h1 className="text-xl font-semibold mb-6">Dashboard</h1>
                                {/* Dashboard stats */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 w-[70%] ">
                                    {/* Enrolments */}
                                    <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                                        <div className="bg-blue-100 text-blue-600 p-1 rounded-full">
                                            <img src="https://icon-library.com/images/icon-of-person/icon-of-person-8.jpg" className="w-10 h-10" />
                                        </div>
                                        <div>
                                            <div className="text-lg font-semibold">2</div>
                                            <div className="text-sm text-gray-500">Total Enrolments</div>
                                        </div>
                                    </div>
                                    {/* Courses */}
                                    <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                                        <div className="bg-purple-100 text-purple-600 p-2 rounded-full">
                                            <img src="https://www.rhombixtechnologies.com/images/learning.svg" className="w-10 h-10" />
                                        </div>
                                        <div>
                                            <div className="text-lg font-semibold">1</div>
                                            <div className="text-sm text-gray-500">Total Courses</div>
                                        </div>
                                    </div>
                                    {/* Earnings */}
                                    <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                                        <div className="bg-green-100 text-green-600 p-2 rounded-full">
                                            <img src="https://cdn-icons-png.freepik.com/512/6573/6573724.png" className="w-10 h-10" />
                                        </div>
                                        <div>
                                            <div className="text-lg font-semibold">$101</div>
                                            <div className="text-sm text-gray-500">Total Earnings</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Latest Enrolments */}
                                <div className="bg-white p-4 rounded-lg shadow w-[70%]">
                                    <h2 className="text-lg font-semibold mb-4">Latest Enrolments</h2>
                                    <table className="w-full text-left text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="py-2">#</th>
                                                <th className="py-2">Student Name</th>
                                                <th className="py-2">Course Title</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b">
                                                <td className="py-2">1</td>
                                                <td className="py-2 flex items-center gap-2">
                                                    <img src="https://icon-library.com/images/icon-of-person/icon-of-person-8.jpg" alt="Avatar" className="w-6 h-6 rounded-full" />
                                                    Md Saif
                                                </td>
                                                <td className="py-2">Introduction to Cybersecurity</td>
                                            </tr>
                                            <tr>
                                                <td className="py-2">2</td>
                                                <td className="py-2 flex items-center gap-2">
                                                    <img src="https://icon-library.com/images/icon-of-person/icon-of-person-8.jpg" alt="Avatar" className="w-6 h-6 rounded-full" />
                                                    Dilkash Jamal
                                                </td>
                                                <td className="py-2">Introduction to Cybersecurity</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}

                        {/* Add Course Form */}
                        {activeTab === 'addCourse' && (
                            <div className="bg-white p-6 rounded-lg shadow w-full max-w-xl">
                                <h1 className="text-xl font-semibold mb-4">Add Course</h1>
                                <form className="space-y-4">
                                    <input type="text" placeholder="Course Title" className="w-full p-2 border rounded" />
                                    <textarea placeholder="Course Description" className="w-full p-2 border rounded"></textarea>
                                    <div className="flex gap-4">
                                        <input type="number" placeholder="Course Price" className="w-full p-2 border rounded" />
                                        <input type="number" placeholder="Discount %" className="w-full p-2 border rounded" />
                                    </div>
                                    <input type="file" className="w-[50%]" />
                                    <button type="button" className="w-full bg-blue-100 text-blue-700 py-2 rounded">+ Add Chapter</button>
                                    <button type="submit" className="w-full bg-black text-white py-2 rounded">ADD</button>
                                </form>
                            </div>
                        )}
                        {activeTab === 'myCourses' && (
                            <div className="bg-white p-6 rounded-lg shadow w-full max-w-3xl">
                                <h1 className="text-lg font-semibold mb-4">My Courses</h1>
                                <table className="min-w-full table-auto text-sm border border-gray-200 rounded overflow-hidden">
                                    <thead className="bg-gray-100 text-gray-700">
                                        <tr>
                                            <th className="text-left px-4 py-2">All Courses</th>
                                            <th className="text-center px-4 py-2">Earnings</th>
                                            <th className="text-center px-4 py-2">Students</th>
                                            <th className="text-center px-4 py-2">Published On</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-t hover:bg-gray-50">
                                            <td className="flex items-center gap-2 px-4 py-3">
                                                <img
                                                    src="https://img-c.udemycdn.com/course/240x135/614772_233b_9.jpg"
                                                    alt="Course Thumbnail"
                                                    className="w-10 h-10 rounded" />
                                                <span>Introduction to Cybersecurity</span>
                                            </td>
                                            <td className="px-4 py-3 text-center">₹ 450.0</td>
                                            <td className="px-4 py-3 text-center">2</td>
                                            <td className="px-4 py-3 text-center">20/06/2025</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </main>
                </div>
            </section>
        </>
    );
}
