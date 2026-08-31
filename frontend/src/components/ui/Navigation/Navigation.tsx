import { useNavigate } from "react-router";
import { Button } from "../Button/Button";
import { Typography } from "../Typography/Typography";

export const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav
      className="flex flex-row flex-wrap items-center justify-between gap-x-2 gap-y-1 border-b border-border bg-background p-4"
      aria-label="Navigation de page"
    >
      <button type="button" onClick={() => navigate("/")}>
        <Typography variant="h4" as="span">
          DiagConso
        </Typography>
      </button>

      <div className="flex flex-row gap-2 sm:gap-4">
        <Button
          variant="navigation"
          onClick={() => {
            navigate("/admin/clients");
          }}
        >
          Admin
        </Button>
        <Button
          variant="navigation"
          onClick={() => {
            navigate("/");
          }}
        >
          Conseiller
        </Button>
      </div>
    </nav>
  );
};
