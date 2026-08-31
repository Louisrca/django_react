import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { http } from "../utils/http";
import type { ClientDetails, SearchClientsResponse } from "../types/clients";

const searchClients = (query: string, page = 1) =>
  http<SearchClientsResponse>(
    `/search-clients?query=${encodeURIComponent(query)}&page=${page}`,
  );

const getClient = (id: number, year?: number) => {
  const queryString = year !== undefined ? `?year=${year}` : "";
  return http<ClientDetails>(`/client/${id}${queryString}`);
};

export function useSearchClients(query: string, page = 1) {
  return useQuery({
    queryKey: ["clients", "search", query, page],
    queryFn: () => searchClients(query, page),
    enabled: query.length > 0,
  });
}

export function useClient(id: number, year?: number) {
  return useQuery({
    queryKey: ["clients", "detail", id, year],
    queryFn: () => getClient(id, year),
    enabled: Number.isFinite(id),
    placeholderData: keepPreviousData,
  });
}
