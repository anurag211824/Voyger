import React, { useState } from "react";
import { Link } from "react-router";
const SignUp = () => {
   const [SignUpData,setSignUpData] = useState({
    email:"",
    username:"",
    password:"",
   })
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...SignUpData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(SignUpData);
   setSignUpData({
      email: "",
      username:"",
      password: "",
    });
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center max-w-[500px] mx-auto ">
      <div className="flex flex-col items-center w-[80%] mb-4 ">
        <img
          src="public/ChatGPT Image Nov 26, 2025, 09_45_44 AM.png"
          alt=""
          width="75"
          height="75"
          className="mb-[-15px]"
        />
        <p className="text-[20px] text-gray-400 font-normal">
          Welcome to Voyger
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-[80%] mx-auto flex flex-col gap-4 p-4 rounded-md border shadow-md border-gray-600">
        {/* Email */}
        <label className="input flex items-center gap-2 w-full focus-within:ring-0">
          <svg
            className="h-5 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-9 6a2 2 0 0 1-2 0L2 7"></path>
            </g>
          </svg>

          <input
            type="email"
            name="email"
            placeholder="mail@gmail.com"
            value={SignUpData.email}
            onChange={handleInputChange}
            required
            className="outline-none focus:outline-none focus:ring-0 focus:border-transparent"
          />
        </label>

        {/* Username */}
        <label className="input flex items-center gap-2 w-full focus-within:ring-0">
          <svg
            className="h-5 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </g>
          </svg>

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleInputChange}
            value={SignUpData.username}
            required
            className="outline-none focus:outline-none focus:ring-0 focus:border-transparent"
          />
        </label>

        {/* Password */}
        <label className="input flex items-center gap-2 w-full focus-within:ring-0">
          <svg
            className="h-5 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.6 17.4A2 2 0 0 0 2 18.8V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.2a2 2 0 0 0 1.4-.6l.8-.8a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>

          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={handleInputChange}
            value={SignUpData.password}
            className="outline-none focus:outline-none focus:ring-0 focus:border-transparent"
          />
        </label>

        <button className="btn  bg-blue-500 text-medium">Sign Up</button>
      </form>
      <p className="mt-3 text-md font-light text-gray-200">
        Already have an account ? <Link to="/login">Go to login</Link>
      </p>
    </div>
  );
};

export default SignUp;
