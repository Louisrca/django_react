import { Outlet } from "react-router";
import { Navigation } from "../ui/Navigation/Navigation";

export const MainContainer = () => (
  <main className="mx-auto">
    <Navigation />
    <div className="mx-auto max-w-2xl">
      <Outlet />
    </div>
  </main>
);
