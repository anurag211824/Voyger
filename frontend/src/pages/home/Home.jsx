import SideBar from "./SideBar";
// import { loginUser } from "../../redux/slices/user";
import MessageContainer from "./MessageContainer";

import MobileSideBar from "./MobileSideBar";
import { useState } from "react";


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

