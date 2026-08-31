import { useNavigate, useParams } from "react-router";
import { ClientDetails } from "@/components/containers/advisor/ClientDetails";
import { Button } from "@/components/ui/Button/Button";
import { ArrowLeft } from "lucide-react";

export const ClientDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="secondary"
        className="self-start"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft /> <span>Retour</span>
      </Button>
      <ClientDetails clientId={Number(id)} />
    </div>
  );
};
