import { Outlet } from "react-router";
import { Navigation } from "../ui/Navigation/Navigation";

export const MainContainer = () => (
  <div className="flex h-dvh flex-col">
    <div className="shrink-0 bg-background">
      <Navigation />
    </div>
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-2xl px-4 my-10">
        <Outlet />
      </div>
    </main>
  </div>
);
