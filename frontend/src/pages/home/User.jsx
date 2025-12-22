import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChatUser } from "../../redux/slices/user";

const User = ({ user , setOpenMObileSideBar}) => {
  const { currentChatUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isActive = currentChatUser?._id === user?._id;


  return (
    <div
      onClick={() => {
        dispatch(setCurrentChatUser({ currentChattingUser: user }));
        setOpenMObileSideBar(prev=>!prev);
      }}
      className={`avatar flex-row gap-2 w-full items-center p-2 cursor-pointer
        ${isActive && `bg-gray-200 rounded-md text-black`}
      `}
    >
      <div className="w-10 rounded-full">
        <img src={user?.avatar} alt="avatar" />
      </div>
      <p>{user?.userName}</p>
    </div>
  );
};

export default User;
