import React, { useEffect } from "react";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, otherUser } from "../../redux/slices/user";
const MobileSideBar = ({ setOpenMObileSideBar, openMobileSideBar }) => {
    const {user,  otherUsers }= useSelector((state)=>state.user)
  const theme = useSelector((state) => state.theme);
  const isDark = theme === "dark";
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(otherUser());
    }, [dispatch]);
  
  // Theme-based UI colors
  const bgColor = isDark ? "#1D232A" : "#FFFFFF";
  const textColor = isDark ? "text-white" : "text-black";
  const borderColor = isDark ? "border-gray-600" : "border-gray-300";
  const inputBg = isDark ? "bg-[#2A323C] text-white" : "bg-gray-100 text-black";
  const logoutBtn = isDark ? "bg-[#286AA1] text-white" : "bg-blue-500 text-white";

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`
        md:hidden w-72 p-2 h-screen fixed top-0 left-0 z-50
        flex flex-col justify-between border-r-2 ${borderColor}
        transition-transform duration-300
        ${openMobileSideBar ? "translate-x-0" : "-translate-x-full"}
        ${textColor}
      `}
    >
      {/* ------------ TOP SECTION ------------- */}
      <div>
        {/* Logo */}
        <div className="flex flex-row items-center gap-2">
          <img
            src="/ChatGPT Image Nov 26, 2025, 09_45_44 AM.png"
            alt=""
            width="50"
            height="50"
            className="-mb-2.5"
          />
          <span>Friends & Chats</span>
        </div>

        {/* SearchBar */}
        <label className={`input mt-3 ${inputBg}`}>
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search"
            className={`${inputBg} focus:outline-none`}
          />
        </label>

        {/* Friends list */}
        <div className="flex flex-col gap-3 overflow-y-auto mt-3 h-[500px] hide-scrollbar">
         {otherUsers.map((user) => {
            return <User setOpenMObileSideBar={setOpenMObileSideBar} key={user.id} user={user} />;
          })}
        </div>
      </div>

      {/* ------------ BOTTOM SECTION ------------- */}
      <div className="flex items-center justify-between gap-2">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={user?.avatar} />
          </div>
        </div>

        <p className={textColor}>{user?.userName}</p>

        <button
         onClick={()=>dispatch(logOutUser())}
         className={`btn btn-sm flex-1 ${logoutBtn}`}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default MobileSideBar;
