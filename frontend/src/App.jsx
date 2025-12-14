import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/slices/user";
function App() {
  const { isAuthenticated,currentChatUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch,isAuthenticated,currentChatUser]);



  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Home /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      // 3. Public Route: Only show Login if NOT authenticated
      element: isAuthenticated ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/signup",
      // 4. Public Route: Only show SignUp if NOT authenticated
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