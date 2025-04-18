import React from 'react';

const BuildSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between py-12 px-6 bg-gray-50 shadow-lg rounded-lg m-6">
      {/* Left Side: Text Content */}
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Build</h1>
        <h2 className="text-gray-700 mb-6">
        "A Safe, Supportive Space to Learn and Teach Anything You Love"
        </h2>
        <ul className="space-y-3">
          <li className="flex items-center">
            <span className="text-blue-500 mr-2">✔</span>
            <span className="text-gray-700">Learn or teach any skill, anytime — from fitness to design, all in one trusted place.</span>
          </li>
          <li className="flex items-center">
            <span className="text-blue-500 mr-2">✔</span>
            <span className="text-gray-700">Join a community where students grow and teachers thrive with real impact.</span>
          </li>
          <li className="flex items-center">
            <span className="text-blue-500 mr-2">✔</span>
            <span className="text-gray-700">All profiles and courses are verified for quality, so you always know who you're learning from or teaching to.</span>
          </li>
          <li className="flex items-center">
            <span className="text-blue-500 mr-2">✔</span>
            <span className="text-gray-700">Secure, simple, and flexible — teach or learn on your schedule, your way.</span>
          </li>
          <li className="flex items-center">
            <span className="text-blue-500 mr-2">✔</span>
            <span className="text-gray-700">Transparent reviews and support ensure a safe and supportive experience for everyone.</span>
          </li>
        </ul>
      </div>

      {/* Right Side: Image with Progress Bar */}
      <div className="md:w-1/2 relative">
        <img
          src="/images/pro.png" // Replace with your image path
          alt="Person in a professional setting"
          className="w-full h-auto rounded-lg shadow-lg"
        />
        {/* Progress Bar Overlay */}
        <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 6h18M3 12h18M3 18h18"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-gray-700 font-medium">motivated</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: '100%' }}
              ></div>
            </div>
            <p className="text-blue-500 text-sm text-right">100%</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildSection;