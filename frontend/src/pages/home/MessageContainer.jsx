import { IoSend } from "react-icons/io5";
import { CiChat1 } from "react-icons/ci";
import User from "./User";
import Message from "./Message";
import { MdNightlight, MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/slices/theme";
import { useEffect } from "react";
const MessageContainer = ({ setOpenMObileSideBar }) => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
  }, [theme, dispatch]);
  return (
    <div className="h-screen flex flex-col justify-end w-full p-2">
      {/* User Info */}
      <div className="flex flex-row justify-between items-center mb-2 border-b-2 border-gray-600 p-1">
        <User />
        <div className="flex gap-3 items-center">
          {theme === "dark" ? (
            <button onClick={() => dispatch(toggleTheme())}>
              {" "}
              <MdLightMode size={24} />{" "}
            </button>
          ) : (
            <button onClick={() => dispatch(toggleTheme())}>
              <MdNightlight size={24} />
            </button>
          )}
          <button
            onClick={() => setOpenMObileSideBar((prev) => !prev)}
            className="md:hidden"
          >
            {" "}
            <CiChat1 size={30} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-2 overflow-y-auto h-[500px] hide-scrollbar">
        <Message />
        <Message />
        <Message />
        <Message />
      </div>

      {/* Send Box */}
      <div className="flex flex-row items-center gap-3 mt-2">
        <input type="text" placeholder="Type here" className="input w-full" />
        <IoSend size={30} />
      </div>
    </div>
  );
};

export default MessageContainer;
