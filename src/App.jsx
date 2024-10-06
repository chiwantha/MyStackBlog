/* eslint-disable react/prop-types */
import Background from "./components/Background";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
// import { DarkModeContextProvider } from "./context/darkModeContext";
import Blog from "./pages/Blog/Blog";
import BlogWrite from "./pages/Blog/BlogWrite";
import Home from "./pages/HomePage/Home";
import Login from "./pages/Login/login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/Register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Profile from "./pages/Profile/Profile";
import Feed from "./pages/Feed/Feed";

function App() {
  const { currentUser } = useContext(AuthContext);

  const queryClient = new QueryClient({});

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="select-none bg-[#f6f3f3] antialiased dark:bg-[#333]">
          <Background />
          <Navbar />
          <div className="mx-2">
            <div className="mx-auto max-w-7xl">
              <div className="flex gap-2">
                <Sidebar />
                <Outlet />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        // <ProtectedRoute>
        <Layout />
        // </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/feed",
          element: <Feed />,
        },
        {
          path: "/blog/:blogid",
          element: <Blog />,
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/write",
          element: (
            <ProtectedRoute>
              <BlogWrite />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div className="select-none">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
