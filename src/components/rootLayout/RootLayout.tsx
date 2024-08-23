import "react-toastify/dist/ReactToastify.css";

import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

export function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}
