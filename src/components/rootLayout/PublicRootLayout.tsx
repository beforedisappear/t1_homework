import { Outlet } from "react-router-dom";

import { PublicHeader } from "@/components/header/PublicHeader";

export function PublicRootLayout() {
  return (
    <>
      <PublicHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}
