import { useNavigate } from "react-router";
import { Button } from "../Button/Button";
import { Typography } from "../Typography/Typography";

export const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav
      className="flex flex-row justify-between gap-2 border-b border-border p-6 bg-background"
      aria-label="Navigation de page"
    >
      <div>
        <Typography variant="display">DiagConso</Typography>
      </div>

      <div className="flex flex-row gap-4">
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
