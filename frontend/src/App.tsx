import { useState } from "react";
import { SearchClient } from "./components/SearchClient";

export default function App() {
  const [clientId, setClientId] = useState(0);

  return (
    <main className="mx-auto max-w-2xl p-8">
      <SearchClient onSelect={setClientId} />
    </main>
  );
}
