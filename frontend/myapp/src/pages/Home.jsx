import React from "react";
import { Link } from "react-router-dom";

/**
 * Home Component
 * This is the landing page for the voting application, designed to be
 * visually appealing with a modern, dark theme and responsive layout.
 */
function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-sans transition-colors duration-300">
      <main className="container mx-auto p-4 md:p-8 lg:p-12">
        {/* Welcome Section */}
        <div className="text-center py-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 mb-4">
            Welcome to MyVote
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Empower your voice, shape the future, and participate in democracy
            like never before. MyVote makes the voting process secure,
            efficient, and accessible to all.
          </p>
        </div>

        <hr className="my-12 border-gray-300 dark:border-gray-700 w-1/3 mx-auto" />

        {/* Why Voting Section */}
        <div className="py-16 text-center animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Why Should You Vote?
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Voting is the foundation of democracy. It allows citizens to have a
            say in shaping policies and electing leaders. Every vote counts, and
            it’s our responsibility to ensure fair representation and
            accountability in government.
          </p>
        </div>

        <hr className="my-12 border-gray-300 dark:border-gray-700 w-1/3 mx-auto" />

        {/* How It Works Section */}
        <div className="py-16 text-center animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-indigo-500 dark:text-indigo-400">
            How Does It Work?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
              <img
                src="https://img.lovepik.com/element/45009/8997.png_860.png"
                alt="Step 1: Register or Login"
                className="w-full h-auto rounded-lg mb-4 object-cover"
              />
              <h4 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                1. Register or Login
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Create an account or log in using your unique voter credentials.
              </p>
            </div>
            {/* Step 2 */}
            <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
              <img
                src="https://th-i.thgim.com/public/incoming/vt3yw/article67648559.ece/alternates/FREE_1200/iStock-1269463469.jpg"
                alt="Step 2: View Elections"
                className="w-full h-auto rounded-lg mb-4 object-cover"
              />
              <h4 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                2. View Elections
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Explore ongoing and upcoming elections you’re eligible to
                participate in.
              </p>
            </div>
            {/* Step 3 */}
            <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
              <img
                src="https://bsmedia.business-standard.com/_media/bs/img/article/2021-04/06/full/1617676272-2577.jpg?im=FeatureCrop,size=(826,465)"
                alt="Step 3: Cast Your Vote"
                className="w-full h-auto rounded-lg mb-4 object-cover"
              />
              <h4 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                3. Cast Your Vote
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Make your choice, confirm your vote, and contribute to
                democracy.
              </p>
            </div>
          </div>
        </div>

        <hr className="my-12 border-gray-300 dark:border-gray-700 w-1/3 mx-auto" />

        {/* Security Section */}
        <div className="py-16 text-center animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-emerald-500 dark:text-emerald-400">
            Your Security Is Our Priority
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            MyVote uses state-of-the-art encryption technologies to ensure that
            every vote remains confidential and secure. Our transparent and
            tamper-proof system builds trust and confidence among voters.
          </p>
        </div>

        {/* Call to Action */}
        <div className="py-16 text-center animate-slide-up">
          <Link
            to="/login"
            className="inline-block py-4 px-8 text-xl font-bold text-white bg-indigo-600 dark:bg-indigo-500 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Home;
