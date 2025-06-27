
import { Link } from 'react-router-dom';


import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const contents = [
    {
        title: "Introduction to JavaScript",
        lessons: [
            { title: "Introduction", duration: "1m 7s" },
            { title: "Installing Development Software", duration: "3m 11s" },
            { title: "Hello World Project from GitHub", duration: "2m 33s" },
            { title: "Our Sample Website", duration: "2m 15s" },
        ],
    },
    { title: "JavaScript Beginning", lessons: [] },
    { title: "Variables and Constants", lessons: [] },
    { title: "Types and Operators", lessons: [] },
    { title: "Program Flow", lessons: [] },
    { title: "Functions", lessons: [] },
    { title: "Objects and the DOM", lessons: [] },
    { title: "Arrays", lessons: [] },
    { title: "Scope and Hoisting", lessons: [] },
    { title: "Summary", lessons: [] },
];


export default function Course() {
    const [activeTab, setActiveTab] = useState('content'); // default tab
    const [openSection, setOpenSection] = useState(0);

    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index);
    };

    return (
        <>
            <div className='flex justify-center min-h-screen-7xl py-6 bg-purple-600 text-white'>
                <div className=' items-center max-w-4xl'>
                    <h1 className="text-3xl font-bold">Getting Started with <span className='text-yellow-300'>JavaScript</span></h1>
                    <p className=" mt-2 mr-56">
                        JavaScript is the popular programming language which powers web pages and web applications. This course will get you started coding in JavaScript.
                    </p>
                </div>
            </div>

            <div className="bg-gray-100 min-h-screen">
                <div className='flex justify-center gap-10 py-2'>
                    <div className="max-w-2xl w-[70%] bg-white rounded-lg shadow-lg p-6">
                        <div className="flex space-x-12 pb-2 text-md text-gray-700 font-medium w-[70%]">
                            <button onClick={() => setActiveTab('content')} className={`cursor-pointer pb-1 ${activeTab === 'content' ? 'border-b-2 border-purple-600' : ''
                                }`}>Contents</button>
                            <button onClick={() => setActiveTab('description')} className={`cursor-pointer pb-1 ${activeTab === 'description' ? 'border-b-2 border-purple-600' : ''
                                }`}>Description</button>
                            <button onClick={() => setActiveTab('reviews')} className={`cursor-pointer pb-1 ${activeTab === 'reviews' ? 'border-b-2 border-purple-600' : ''
                                }`}>Reviews</button>

                            <button onClick={() => setActiveTab('faq')} className={`cursor-pointer pb-1 ${activeTab === 'faq' ? 'border-b-2 border-purple-600' : ''
                                }`}>FAQ</button>
                        </div>
                        <hr />
                        {activeTab === 'content' && (
                            <>
                                <div className="mt-2 divide-y">
                                    {contents.map((section, index) => (
                                        <div key={index}>
                                            <button
                                                onClick={() => toggleSection(index)}
                                                className="w-full flex justify-between items-center py-2 text-left font-semibold text-gray-800"
                                            >
                                                <span>{section.title}</span>
                                                {openSection === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </button>
                                            {openSection === index && section.lessons.length > 0 && (
                                                <ul className="ml-4 text-sm text-gray-600 space-y-1 pb-2">
                                                    {section.lessons.map((lesson, i) => (
                                                        <li key={i} className="flex justify-between">
                                                            <span className="flex items-center gap-2">
                                                                <span className="text-lg">•</span> {lesson.title}
                                                            </span>
                                                            <span>{lesson.duration}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>

                            </>
                        )}
                        {activeTab === 'description' && (
                            <>
                                <div>
                                    <div className="lg:col-span-2">
                                        {/* Course Description */}
                                        <h2 className="text-xl font-semibold my-2">Course Description</h2>
                                        <p className="text-gray-700">
                                            If you're learning to program for the first time, or if you're coming from a different language, this course, JavaScript: Getting Started, will give you the basics for coding in JavaScript...
                                        </p>
                                        <p className="text-gray-700 mt-2">
                                            If you're learning to program for the first time, or if you're coming from a different language, this course, JavaScript: Getting Started, will give you the basics for coding in JavaScript...
                                        </p>
                                        <h3 className="mt-4 text-lg font-semibold">What you’ll learn</h3>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
                                            <li>Recognize the importance of understanding your audience</li>
                                            <li>Identify the fundamentals of composing a successful course</li>
                                            <li>Explore how to connect with your audience</li>
                                            <li>Examine ways to connect with your audience by personalizing content</li>
                                            <li>Break down the best ways to exclude ineffective presence</li>
                                            <li>Explore how to communicate the unknown in an engaging way</li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )}

                    </div>

                    <div className='grid gap-6 w-5xl'>
                        <div className="bg-white p-2  rounded-md shadow-md text-center">
                            <div className='bg-yellow-400 px-20 py-12'>
                                <img src="https://img.icons8.com/?size=100&id=39854&format=png&color=FFFFFF" alt="JavaScript" className="w-16 mx-auto mb-2" />
                            </div>
                            <p className="text-xl text-left font-semibold">$600 <span className="line-through text-sm text-gray-500">$740</span></p>
                            <button className="mt-4 w-full bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800">
                                Start Free Month
                            </button>
                            <button className="block w-full mt-2 border border-purple-700 text-purple-700 px-4 py-2 rounded">
                                Get Full Access
                            </button>
                        </div>

                        <div className="bg-white p-4 rounded-md shadow-md text-center">
                            <div className="mt-2 text-left text-sm text-gray-700 space-y-1">
                                <h4 className="font-medium">What's included</h4>
                                <ul className="list-disc list-inside">
                                    <li>12 hours video</li>
                                    <li>Certificate</li>
                                    <li>12 Articles</li>
                                    <li>Watch Offline</li>
                                    <li>Lifetime access</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
