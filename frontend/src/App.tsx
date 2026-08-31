import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { MainContainer } from "./components/layouts/MainContainer";
import { Admin } from "./pages/AdminPage";
import { Advisor } from "./pages/AdvisorPage";
import { ClientDetailsPage } from "./pages/ClientDetailsPage";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainContainer />}>
            <Route path="/" element={<Advisor />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/clients/:id" element={<ClientDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
