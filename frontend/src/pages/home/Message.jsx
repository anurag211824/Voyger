
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
  const { user, currentChatUser } = useSelector((state) => state.user);
  const isOwnMessage = message?.senderId?._id === user?._id || message?.senderId === user?._id;
  
  // Get sender info - handle both populated and non-populated senderId
  const getSenderInfo = () => {
    if (isOwnMessage) {
      return {
        avatar: user?.avatar || '/default-avatar.svg',
        userName: user?.userName || 'You'
      };
    } else {
      // If senderId is populated (from DB), use it; otherwise use currentChatUser
      if (message?.senderId?._id) {
        return {
          avatar: message.senderId.avatar || '/default-avatar.svg',
          userName: message.senderId.userName || 'User'
        };
      } else if (message?.senderInfo) {
        // For real-time messages with sender info
        return {
          avatar: message.senderInfo.avatar || '/default-avatar.svg',
          userName: message.senderInfo.userName || 'User'
        };
      } else {
        return {
          avatar: currentChatUser?.avatar || '/default-avatar.svg',
          userName: currentChatUser?.userName || 'User'
        };
      }
    }
  };

  const senderInfo = getSenderInfo();
  
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
            <img 
              src={senderInfo.avatar} 
              alt="avatar" 
              onError={(e) => {
                e.target.src = '/default-avatar.svg';
              }}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Header */}
        <div className="chat-header">
          {senderInfo.userName}
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
