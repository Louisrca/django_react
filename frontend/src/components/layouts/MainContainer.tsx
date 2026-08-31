import { Outlet } from "react-router";

export const MainContainer = () => (
  <main className="mx-auto max-w-2xl p-8">
    <Outlet />
  </main>
);
