import React, { useEffect, useState } from 'react';
import image1 from '../assets/lynton-hubspot-workflows.png';
import CourseCategorie from '../components/course-categories';

const Home = () => {

  //saif code start

  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const texts = [
    "Data Science",
    "Programming",
    "Web Development",
    "UI / UX Design",
    "Business",
    "Cloud Computing",
    "Cyber Security",
    "AI"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentText((prev) => (prev + 1) % texts.length);
        setIsVisible(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <>
    {/* SAIF */}
      {/* Main Container */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        
        {/* Hero Section with Text and Image */}
        <div className="flex flex-col lg:flex-row justify-between items-center  max-w-8xl ml-16">
          
          {/* Left Side - Text Content */}
          <div className="flex-1 max-w-4xl mt-12 lg:mt-24">
            {/* Main Heading */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-baseline flex-wrap">
                <span>Advance Your Career with</span>
                <span
                  className={`text-3xl md:text-3xl ml-3 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 ${
                    isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                  }`}
                >
                  {texts[currentText]}
                </span>
              </h1>
            </div>

            {/* Call to Action */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                Join the <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-lg">Top 1%</span> Today
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl">
                Master coding skills with curated resources and expert guidance — Learn the skills that set you apart and join the Top 1% of coding achievers!
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="px-8 py-3 border-2 border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 transition-colors duration-200 min-w-40">
                Start for Free
              </button>
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 min-w-40">
                Explore Plus
              </button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="w-full max-w-lg">
              <img className="w-full h-auto max-w-lg rounded-tl-2xl rounded-bl-2xl" src={image1} alt="Learning illustration" />
            </div>
          </div>
        </div>

        {/* Stats Section - This will appear below hero section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-12 text-center">
              Our Journey in Numbers
            </h2>
            
            {/* Stats Component will render here */}
            {/* <Stats /> */}
            
            {/* Temporary placeholder - remove when Stats component works */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">12+</div>
                <div className="text-gray-600">Qualified Instructors</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600 mb-2">2000</div>
                <div className="text-gray-600">Course Enrollments</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">500</div>
                <div className="text-gray-600">Courses in 2 Languages</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">100+</div>
                <div className="text-gray-600">Online Videos</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <CourseCategorie/>
            </div>
        </div>
      </div>

      {/* TAUSIF */}



      {/* NEMAT */}
    </>
  );
};

export default Home;