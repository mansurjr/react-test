import { memo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import LoginPage from "./login";
import RegisterPage from "./register";
import OrderList from "./dashboard";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },

    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <OrderList />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default memo(AppRouter);
