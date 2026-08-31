import { Button } from "@/components/ui/Button/Button";
import { Link } from "react-router";

export const Navigation = () => {
  return (
    <nav
      className="flex flex-row flex-wrap items-center justify-between gap-x-2 gap-y-1 border-b border-border bg-background p-4"
      aria-label="Navigation de page"
    >
      <Link
        to="/"
        aria-label="Accueil"
        className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <img src="/hello-watt.svg" alt="Hello Watt" width={168} height={32} />
      </Link>

      <div className="flex flex-row gap-2 sm:gap-4">
        <Button asChild variant="navigation">
          <Link to="/admin/clients">Admin</Link>
        </Button>
        <Button asChild variant="navigation">
          <Link to="/">Conseiller</Link>
        </Button>
      </div>
    </nav>
  );
};
