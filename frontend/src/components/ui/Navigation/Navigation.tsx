import { useNavigate } from "react-router";
import { Button } from "../Button/Button";

export const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-row justify-between gap-2 border-b border-slate-200 p-6 mb-8">
      <div>
        <h1>DiagConso</h1>
      </div>

      <div className="flex flex-row gap-4">
        <Button
          variant="navigation"
          onClick={() => {
            navigate("/admin");
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
