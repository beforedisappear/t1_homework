import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { PrivateRootLayout } from "./PrivateRootLayout";
import { PublicRootLayout } from "./PublicRootLayout";

export function RootLayout({ isPrivate }: { isPrivate: boolean }) {
  return (
    <>
      {isPrivate ? <PrivateRootLayout /> : <PublicRootLayout />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
