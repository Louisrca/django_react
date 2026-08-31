export type Client = {
  id: number;
  full_name: string;
  has_elec_heating: boolean;
  has_anomaly: boolean;
};

export type AnomalyDate = {
  year: number;
  month: number;
};

export type MonthConsumption = {
  year: number;
  month: number;
  kwh_consumed: number;
};

/** GET /api/client/<id> */
export type ClientDetails = Client & {
  anomaly_date: AnomalyDate | null;
  available_years: number[];
  consumptions: MonthConsumption[];
};

/** GET /api/search-clients */
export type SearchClientsResponse = {
  clients: Client[];
  page: number;
  page_count: number;
};
