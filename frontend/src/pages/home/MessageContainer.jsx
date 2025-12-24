import { IoSend } from "react-icons/io5";
import { CiChat1 } from "react-icons/ci";
import Message from "./Message";
import { MdNightlight, MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/slices/theme";
import { useEffect, useState, useRef } from "react";
import CurrentChatUser from "./CurrentChatUser";
import { addSocketMessage, getMessage, sendMessage } from "../../redux/slices/message";
import { SocketContext } from "../../socket/SocketContext";
import { useContext } from "react";
const MessageContainer = ({ setOpenMObileSideBar }) => {
  const { sendSocketMessage, onReceiveMessage, offReceiveMessage } = useContext(SocketContext);
  const theme = useSelector((state) => state.theme);
  const { currentChatUser, user } = useSelector((state) => state.user);
  const { messages, loading } = useSelector((state) => state.message);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const handleInputChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };
  
  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const dispatch = useDispatch();
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim() || !currentChatUser?._id) return;

    const payload = {
      receiverId: currentChatUser._id,
      message: message.trim(),
    };

    // 1️⃣ Save in DB
    dispatch(sendMessage(payload));

    // 2️⃣ Send real-time with complete sender info
    sendSocketMessage({
      senderId: user._id,
      receiverId: currentChatUser._id,
      message: message.trim(),
      createdAt: new Date().toISOString(),
      // Add sender info for immediate display
      senderInfo: {
        _id: user._id,
        userName: user.userName,
        avatar: user.avatar
      }
    });

    setMessage("");
  };

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
  }, [theme]);
  useEffect(() => {
    if (currentChatUser?._id) {
      dispatch(getMessage(currentChatUser._id));
    }
  }, [currentChatUser, dispatch]);
  
  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  // Set up socket listener once when component mounts
  useEffect(() => {
    const handleReceiveMessage = (newMessage) => {
      console.log("Received message via socket:", newMessage);
      // Only add message if it's related to current chat
      if (
        (newMessage.senderId === currentChatUser?._id && newMessage.receiverId === user?._id) ||
        (newMessage.senderId === user?._id && newMessage.receiverId === currentChatUser?._id)
      ) {
        dispatch(addSocketMessage(newMessage));
      }
    };

    onReceiveMessage(handleReceiveMessage);

    return () => {
      offReceiveMessage();
    };
  }, [currentChatUser?._id, user?._id, dispatch, onReceiveMessage, offReceiveMessage]);
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
          <div 
            ref={messagesContainerRef}
            className="flex-1 p-2 overflow-y-auto hide-scrollbar"
          >
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
                    key={message._id || `${message.senderId}-${index}`}
                    message={message}
                    showDate={showDate}
                  />
                );
              })
            )}
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
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
