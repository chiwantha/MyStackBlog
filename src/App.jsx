/* eslint-disable react/prop-types */
import Background from "./components/Background";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import BlogDetails from "./pages/Blog/BlogDetails";
import Home from "./pages/HomePage/Home";
import Login from "./pages/login/login";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

function App() {
  const currentUser = true;

  const Layout = () => {
    return (
      <div className="select-none antialiased">
        <Background />
        <Navbar />
        <div className="mx-2">
          <div className="mx-auto max-w-7xl py-3">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
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
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/blog",
          element: <BlogDetails />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
