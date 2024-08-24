import "./styles/global.scss";

import {
  createBrowserRouter,
  LoaderFunctionArgs,
  redirect,
  RouterProvider,
} from "react-router-dom";

import { RootLayout } from "@/components/rootLayout/RootLayout";

import { MainPage } from "@/pages/MainPage";
import { CartPage } from "@/pages/CartPage";
import { ProductByIdPage } from "@/pages/ProductByIdPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { LoginPage } from "@/pages/LoginPage";

import { useAppDispatch, useAppSelector } from "./store";
import { useLayoutEffect } from "react";

import { setAccessToken } from "./slices/authSlice";

function App() {
  const dispatch = useAppDispatch();
  const userToken = localStorage.getItem("token");
  const token = useAppSelector((state) => state.authSlice.token);

  useLayoutEffect(() => {
    //save token to store when app initializing
    if (userToken) dispatch(setAccessToken(userToken));
  }, []);

  const privateRoutes = [
    { index: true, element: <MainPage /> },
    {
      path: "/product/:id",
      element: <ProductByIdPage />,
    },
    {
      path: "/cart",
      element: <CartPage />,
    },
  ];

  const publicRoutes = [
    {
      path: "/login",
      element: <LoginPage />,
    },
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout isPrivate={!!token} />,
      loader: ({ request }: LoaderFunctionArgs) => {
        const url = new URL(request.url);

        //redirect to /login if user isn't logged in
        if (!userToken && url.pathname !== "/login") {
          return redirect("/login");
        }

        return null;
      },
      children: [
        ...(token ? privateRoutes : publicRoutes),
        {
          path: "/*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
