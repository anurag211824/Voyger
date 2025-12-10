// import React from 'react'
// import SideBar from './SideBar';
// import MessageContainer from './MessageContainer';
// import { loginUser } from '../../redux/slices/user.js'
// import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// const Home = () => {
//   // const {username,loading }= useSelector((state) => state.user);

//   // const dispatch = useDispatch();
//   // if(loading){
//   //   return <p>Loading.....</p>
//   // }
//   return (
//     <>
//     <div className='min-h-screen flex flex-row'>
//       <SideBar/>
//       <MessageContainer/>
//     </div>
//     </>
//   );
// };

// export default Home
import SideBar from "./SideBar";
// import { loginUser } from "../../redux/slices/user";
import MessageContainer from "./MessageContainer";
import { useState } from "react";
import MobileSideBar from "./MobileSideBar";

const Home = () => {  
  const [openMobileSideBar,setOpenMobileSideBar] = useState(false) 
  return (
   <div className="min-h-screen flex flex-row">
    <SideBar/>
    <MobileSideBar openMobileSideBar={openMobileSideBar}/>
    <MessageContainer setOpenMObileSideBar={setOpenMobileSideBar}/>
   </div>
  );
};

export default Home;

