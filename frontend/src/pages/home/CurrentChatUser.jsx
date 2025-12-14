import React from "react";
import { useSelector } from "react-redux";

const CurrentChatUser = () => {
  const { currentChatUser } = useSelector((state) => state.user);

  return (
    <div
      className={`avatar flex-row gap-2 w-full items-center p-2 cursor-pointer `}
    >
      <div className="w-10 rounded-full">
        <img src={currentChatUser?.avatar} alt="avatar" />
      </div>
      <p>{currentChatUser?.userName}</p>
    </div>
  );
};

export default CurrentChatUser;
