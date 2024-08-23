import "./styles/global.scss";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RootLayout } from "@/components/rootLayout/RootLayout";

import { MainPage } from "@/pages/MainPage";
import { CartPage } from "@/pages/CartPage";
import { ProductByIdPage } from "@/pages/ProductByIdPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { LoginPage } from "@/pages/LoginPage";
import { useAppSelector } from "./store";

function App() {
  const token = useAppSelector((state) => state.authSlice.token);

  const publicRoutes = [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <MainPage /> },
        {
          path: "/product/:id",
          element: <ProductByIdPage />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/*",
          element: <NotFoundPage />,
        },
      ],
    },
  ];

  const privateRoutes = [{ path: "/login", element: <h1>2</h1> }];

  const router = createBrowserRouter([
    ...publicRoutes,
    ...(token ? privateRoutes : []),
  ]);

  return <RouterProvider router={router} />;
}

export default App;
