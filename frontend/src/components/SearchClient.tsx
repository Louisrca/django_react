import { useEffect, useState } from "react";
import { useSearchClients } from "../api/clients";
import { Input } from "./ui/Input";
import { StatusText } from "./ui/StatusText";
import { ClientsList } from "./ClientsList";

type SearchClientProps = {
  onSelect: (id: number) => void;
};

export const SearchClient = ({ onSelect }: SearchClientProps) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const { data, isPending, isError } = useSearchClients(debouncedQuery);
  const hasQuery = debouncedQuery.length > 0;

  return (
    <div className="mt-4">
      <Input
        label="Rechercher un client"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {hasQuery && isPending && <StatusText>Recherche…</StatusText>}
      {hasQuery && isError && (
        <StatusText tone="error">Erreur lors de la recherche.</StatusText>
      )}
      {hasQuery && data?.clients.length === 0 && (
        <StatusText>Aucun client trouvé.</StatusText>
      )}

      {data && data.clients.length > 0 && (
        <ClientsList data={data} onSelect={onSelect} />
      )}
    </div>
  );
};
