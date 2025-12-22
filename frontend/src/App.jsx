import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/slices/user";
function App() {
  console.log(localStorage.getItem("isAuthenticated"));
  
  const { isAuthenticated,currentChatUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if((localStorage.getItem("isAuthenticated") !== true)){
       dispatch(loadUser());
       localStorage.setItem("isAuthenticated",true)
    }
  }, [dispatch,isAuthenticated,currentChatUser]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Home /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/signup",
      element: isAuthenticated ? <Navigate to="/" /> : <SignUp />,
    },
  ]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;