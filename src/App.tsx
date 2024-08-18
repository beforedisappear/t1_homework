import "./styles/global.scss";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RootLayout } from "@/components/rootLayout/RootLayout";

import { MainPage } from "@/pages/MainPage";
import { CartPage } from "@/pages/CartPage";
import { ProductByIdPage } from "@/pages/ProductByIdPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

function App() {
  const router = createBrowserRouter([
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
          path: "/*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
