import React, { useState } from 'react';

export default function Courses() {
  const [category, setCategory] = useState('Development');

  const filteredCourses = [
   
    {
      id: 1,
      category: 'Development',
      name:'JavaScript',
      level: 'Intermediate',
      title: 'How to easily create a website with',
      author: 'Claire Evans',
      rating: 4.5,
      reviews:"9,300",
      price: '₹350.00',
      image: 'https://img.icons8.com/?size=100&id=39854&format=png&color=FFFFFF',
    },
    {
      id: 2,
      category: 'Development',
      name:'CSS3',
      level: 'Beginner',
      title: 'CSS: ultimate CSS course from',
      author: 'Carolyn Welborn',
      rating: 4.5,
      reviews: "8,990",
      price: '₹500.00',
      image: 'https://img.icons8.com/?size=100&id=38272&format=png&color=FFFFFF',
    },

    {
      id: 3,
      category: 'Development',
      name:'HTML',
      level: 'Intermediate',
      title: 'HTML: ultimate HTML course from',
      author: 'Claire Evans',
      rating: 4.5,
      reviews:"13,200",
      price: '₹450.00',
      image: 'https://img.icons8.com/?size=100&id=10428&format=png&color=FFFFFF',
    },
    {
      id: 4,
      category: 'Development',
      name:'Gatsby',
      level: 'Intermediate',
      title: 'The Gatsby Course: build web',
      author: 'Floyd Amall',
      rating: 4.5,
      reviews: 9300,
      price: '₹300.00',
      image: 'https://img.icons8.com/?size=100&id=l5PIGvv2nX8D&format=png&color=FFFFFF',
    },
    {
      id: 5,
      category: 'Design',
      name:'JavaScript',
      level: 'Intermediate',
      title: 'How to easily create a website with',
      author: 'Claire Evans',
      rating: 4.5,
      reviews: 9300,
      price: '₹300.00',
      image: 'https://img.icons8.com/color/48/javascript.png',
    },
    {
      id: 6,
      category: 'Design',
      name:'JavaScript',
      level: 'Intermediate',
      title: 'How to easily create a website with',
      author: 'Claire Evans',
      rating: 4.5,
      reviews: 9300,
      price: '₹300.00',
      image: 'https://img.icons8.com/color/48/javascript.png',
      
    },
    {
      id: 7,
      category: 'Design',
      name:'JavaScript',
      level: 'Intermediate',
      title: 'How to easily create a website with',
      author: 'Claire Evans',
      rating: 4.5,
      reviews: 9300,
      price: '₹300.00',
      image: 'https://img.icons8.com/color/48/javascript.png',
      
    },
    {
      id: 8,
      category: 'Design',
      name:'JavaScript',
      level: 'Intermediate',
      title: 'How to easily create a website with',
      author: 'Claire Evans',
      rating: 4.5,
      reviews: 9300,
      price: '₹300.00',
      image: 'https://img.icons8.com/color/48/javascript.png',
      
    },
    
    
  ];
  const bgColors = {
  JavaScript: 'bg-yellow-400',
  CSS3: 'bg-blue-800',
  HTML: 'bg-orange-500',
  Gatsby: 'bg-purple-600',
 
};


  const renderCard = (course) => (
    <div key={course.id} className="bg-white rounded-xl shadow border overflow-hidden">
      <div className={`${bgColors[course.name] || 'bg-gray-300'} p-8`}>
        <div className='flex justify-center items-center '>
          <img src={course.image} alt="JavaScript" className="h-10 w-10" />
        </div>
        
        <p className="font-semibold mt-2 text-white text-center text-xl">{course.name}</p>
      </div>
      <div className="p-4">
        <span className="text-xs text-cyan-600 font-semibold bg-cyan-100 px-2 py-1 rounded">{course.level}</span>
        <h3 className="font-bold text-lg mt-4">{course.title}</h3>
        <p className="text-sm text-gray-500 mt-1">By: {course.author}</p>
        <div className="flex items-center mt-4 text-l text-yellow-500">
          <span>★★★★★ {course.rating} </span>
          <span className="text-gray-400 ml-1">({course.reviews})</span>
        </div>
        <div className="mt-4 text-sm font-semibold">{course.price}</div>
        <a href="#"className="mt-1 text-indigo-600 flex items-center text-sm">
          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Get Enrolled
        </a>
      </div>
    </div>
    
  );

  return (
    <div className="box">
      {/* Category Buttons */}
      <div className="bg-[#c3d3e9] flex pt-3 pr-2.5 pl-5 gap-x-10 mb-8 rounded">
        {['Development', 'Design', 'Marketing', 'Business'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`text-gray-700 hover:border-b-2 border-purple-600 font-medium mb-2 pb-2 hover:text-purple-600 ${
              category === cat ? 'border-b-2 text-purple-600' : ''
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCourses
          .filter((c) => c.category === category)
          .map(renderCard)}
      </div>
    </div>
  );
}
