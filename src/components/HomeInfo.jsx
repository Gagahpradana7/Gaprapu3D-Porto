import React from "react";
import { Link } from "react-router-dom";

const rendederContent = {
  1: (
    <h1 className="text-base text-center py-2 px-4 mx-3 my-2 rounded-md text-white font-semibold bg-gradient-to-r from-purple-600 to-blue-500 shadow-sm -mt-6">
      Hi, My Name Is <span className="font-bold">Gagah Pradana</span>
      <span
        className="inline-block ml-1 animate-waving-hand"
        role="img"
        aria-label="waving hand"
      >
        👋
      </span>
      <br />
      Welcome To My 3D Portfolio
    </h1>
  ),
  2: (
    <div className="text-center py-2 px-4 mx-3 my-2 rounded-md sm:text-base text-white font-semibold bg-gradient-to-r from-purple-600 to-blue-500 shadow-sm -mt-4">
      I attended a full-stack JavaScript bootcamp <br />
      and gained many skills along the way.
      <Link
        to="/about"
        className="mt-2 block bg-white rounded-md py-1 px-3 text-blue-600 font-medium hover:bg-gray-50 transition-colors"
      >
        Learn more →
      </Link>
    </div>
  ),
  3: (
    <div className="text-center py-2 px-4 mx-3 my-2 rounded-md text-white font-semibold bg-gradient-to-r from-purple-600 to-blue-500 shadow-sm -mt-4">
      Explore my projects to see how I apply my skills.
      <Link
        to="/projects"
        className="mt-2 block bg-white rounded-md py-1 px-3 text-blue-600 font-medium hover:bg-gray-50 transition-colors"
      >
        View projects →
      </Link>
    </div>
  ),
  4: (
    <div className="text-center py-2 px-4 mx-3 my-2 rounded-md text-white font-semibold bg-gradient-to-r from-purple-600 to-blue-500 shadow-sm -mt-4">
      Want to hire me or get in touch? Let's talk!
      <Link
        to="/contact"
        className="mt-2 block bg-white rounded-md py-1 px-3 text-blue-600 font-medium hover:bg-gray-50 transition-colors"
      >
        Contact me →
      </Link>
    </div>
  ),
};

const HomeInfo = ({ currentStage }) => {
  return rendederContent[currentStage] || null;
};

export default HomeInfo;
