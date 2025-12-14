import { IoSend } from "react-icons/io5";
import { CiChat1 } from "react-icons/ci";
import Message from "./Message";
import { MdNightlight, MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/slices/theme";
import { useEffect, useState } from "react";
import CurrentChatUser from "./CurrentChatUser";
import { getMessage, sendMessage } from "../../redux/slices/message";
import toast from "react-hot-toast";

const MessageContainer = ({ setOpenMObileSideBar }) => {
  const theme = useSelector((state) => state.theme);
  const { currentChatUser } = useSelector((state) => state.user);
  const { messages, loading } = useSelector((state) => state.message);
  const [message, setMessage] = useState("");
  const handleInputChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };
  const dispatch = useDispatch();
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    if (!currentChatUser?._id) {
      toast.error("No user selected");
      return;
    }

    try {
      console.log("Sending message:", {
        receiverId: currentChatUser._id,
        message: message.trim(),
      });

      dispatch(
        sendMessage({
          receiverId: currentChatUser._id,
          message: message.trim(),
        })
      );

      setMessage("");
      toast.success("Message sent!");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    }
  };

  useEffect(() => {

    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    if (currentChatUser?._id) {
      dispatch(getMessage(currentChatUser._id));
    }
  }, [theme, currentChatUser, dispatch]);

  return (
    <div className="h-screen flex flex-col w-full p-2">
      {/* ================= Header ================= */}
      <div className="flex items-center justify-between border-b border-gray-600 p-2">
        {currentChatUser ? (
          <CurrentChatUser />
        ) : (
          <p className="text-gray-500">Click Friend Profile</p>
        )}

        <div className="flex gap-3 items-center">
          <button onClick={() => dispatch(toggleTheme())}>
            {theme === "dark" ? (
              <MdLightMode size={24} />
            ) : (
              <MdNightlight size={24} />
            )}
          </button>

          <button
            onClick={() => setOpenMObileSideBar((prev) => !prev)}
            className="md:hidden"
          >
            <CiChat1 size={30} />
          </button>
        </div>
      </div>
      {loading && <p className="text-gray-50 text-center">Loading Chats....</p>}
      {/* ================= Body ================= */}
      {!currentChatUser ? (
        <div className="flex-1 flex items-center justify-center relative overflow-hidden">
          {/* Background Logo */}
          <img
            src="/ChatGPT Image Nov 26, 2025, 09_45_44 AM.png"
            alt="Chat logo"
            className="absolute w-[450px] opacity-10 select-none pointer-events-none"
          />

          {/* Foreground Text */}
          <div className="z-10 text-center">
            <h1 className="text-2xl font-semibold mb-2 dark:text-white">
              Select a user to start chatting
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Choose someone from the sidebar to begin a conversation
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* ================= Messages ================= */}
          <div className="flex-1 p-2 overflow-y-auto hide-scrollbar">
            {messages.length === 0 ? (
              <p className="text-center text-gray-500 mt-4">No messages yet</p>
            ) : (
              messages.map((message, index) => {
                const prevMessage = messages[index - 1];

                const showDate =
                  !prevMessage ||
                  new Date(prevMessage.createdAt).toDateString() !==
                    new Date(message.createdAt).toDateString();
                return (
                  <Message
                    key={message._id}
                    message={message}
                    showDate={showDate}
                  />
                );
              })
            )}
          </div>

          {/* ================= Input Box ================= */}
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-3 border-t border-gray-600 pt-2"
          >
            <input
              type="text"
              value={message}
              onChange={handleInputChange}
              placeholder="Type here..."
              className="input w-full"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className={`btn btn-circle ${
                loading || !message.trim() ? "btn-disabled" : "btn-primary"
              }`}
            >
              <IoSend size={20} />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default MessageContainer;
