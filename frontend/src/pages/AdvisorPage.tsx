import { useState } from "react";
import { ClientDetails } from "../components/containers/advisor/ClientDetails";
import { SearchClient } from "../components/containers/advisor/SearchClient";

export const Advisor = () => {
  // the first object starts with id 1
  const [clientId, setClientId] = useState(1);
  return (
    <div className="flex flex-col gap-4">
      <SearchClient onSelect={setClientId} />
      <ClientDetails clientId={clientId} />
    </div>
  );
};
