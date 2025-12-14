
import { useSelector } from "react-redux";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Message = ({ message, showDate }) => {
  const { user } = useSelector((state) => state.user);
   console.log(message)
  const isOwnMessage = message?.senderId?._id === user?._id;
  
  return (
    <>
      {/* Date Separator */}
      {showDate && (
        <div className="flex justify-center my-3">
          <span className="px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
            {formatDate(message.createdAt)}
          </span>
        </div>
      )}

      {/* Chat Message */}
      <div className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}>
        {/* Avatar */}
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={message?.senderId?.avatar} alt="avatar" />
          </div>
        </div>

        {/* Header */}
        <div className="chat-header">
          {message?.senderId?.userName}
          <time className="text-xs opacity-50 ml-2">
            {formatTime(message.createdAt)}
          </time>
        </div>

        {/* Message Bubble */}
        <div
          className={`chat-bubble ${
            isOwnMessage
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black dark:bg-gray-700 dark:text-white"
          }`}
        >
          {message.message}
        </div>

        {/* Footer */}
        <div className="chat-footer opacity-50">
          {isOwnMessage ? "Delivered" : ""}
        </div>
      </div>
    </>
  );
};

export default Message;
