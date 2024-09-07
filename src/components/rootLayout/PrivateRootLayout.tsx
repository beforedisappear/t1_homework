import { Outlet } from "react-router-dom";

import { PrivateHeader } from "@/components/header/PrivateHeader";
import { Footer } from "@/components/footer/Footer";
import { Preloader } from "@/components/preloader/Preloader";

import { useGetUserQuery } from "@/api/userApi";
import { ErrorBoundary } from "../errorBoundary/ErrorBoundary";

export function PrivateRootLayout() {
  const { isLoading, isUninitialized, isError } = useGetUserQuery(undefined);

  if (isLoading || isUninitialized) return <Preloader />;
  else if (isError) return <ErrorBoundary />;

  return (
    <>
      <PrivateHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
