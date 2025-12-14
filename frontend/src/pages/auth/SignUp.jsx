import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { API } from "../../utility/api";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/user";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const [SignUpData, setSignUpData] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
  });
  const [avatar, setAvatar] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...SignUpData, [name]: value });
  };
  const handleFileChange = (e) => {
    console.log(e.target.files);
    setAvatar(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRegistrationData = new FormData();
    Object.keys(SignUpData).forEach((key) => {
      userRegistrationData.append(key, SignUpData[key]);
    });
    if (avatar) {
      userRegistrationData.append("avatar", avatar);
    }
    for (const pair of userRegistrationData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    dispatch(registerUser(userRegistrationData));
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
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

      <form
        onSubmit={handleSubmit}
        className="w-[80%] mx-auto flex flex-col gap-4 p-4 rounded-md border shadow-md border-gray-600"
      >
        {/* fullName */}
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
            name="fullName"
            placeholder="fullname"
            onChange={handleInputChange}
            value={SignUpData.fullName}
            required
            className="outline-none focus:outline-none focus:ring-0 focus:border-transparent"
          />
        </label>

        {/* UserName */}
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
            name="userName"
            placeholder="userName"
            onChange={handleInputChange}
            value={SignUpData.userName}
            required
            className="outline-none focus:outline-none focus:ring-0 focus:border-transparent"
          />
        </label>

        {/* email */}
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
        {/* phone */}
        <label className="input flex items-center gap-2 w-full focus-within:ring-0">
          {/* Phone Icon SVG */}
          <svg
            className="h-5 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>

          <input
            type="tel"
            name="phone"
            placeholder="+91"
            value={SignUpData.phone}
            onChange={handleInputChange}
            className="outline-none focus:outline-none focus:ring-0 focus:border-transparent w-full"
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
        {/* gender */}
        <div className="input flex items-center gap-2 w-full">
          {/* Radio Group */}
          <div className="flex items-center gap-4 pl-2">
            {/* Male Option */}
            <label className="cursor-pointer flex items-center gap-2">
              <span className="label-text">Male</span>
              <input
                type="radio"
                name="gender"
                value="male"
                className="radio radio-primary radio-sm"
                checked={SignUpData.gender === "male"}
                onChange={handleInputChange}
              />
            </label>

            {/* Female Option */}
            <label className="cursor-pointer flex items-center gap-2">
              <span className="label-text">Female</span>
              <input
                type="radio"
                name="gender"
                value="female"
                className="radio radio-primary radio-sm"
                checked={SignUpData.gender === "female"}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
        {/* avatar */}
        <div className="input flex items-center gap-2 w-full pl-4 pr-0">
          {/* Paperclip Icon */}
          <svg
            className="h-5 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>

          {/* File Input */}
          <input
            type="file"
            name="avatar"
            onChange={handleFileChange}
            className="file-input file-input-ghost w-full border-none focus:outline-none h-full"
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center font-medium">
            {error}
          </p>
        )}
        <button
          className="btn bg-blue-500 text-medium"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading loading-spinner text-black"></span>
              <span className="text-black"> Signing Up...</span>
            </>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
      <p className="mt-3 text-md font-light text-gray-200">
        Already have an account ?{" "}
        <Link className="underline text-blue-500" to="/login">
          Go to login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
