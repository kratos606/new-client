
export interface DataSource {
  id: string;
  title: string;
  image?: string;
  url?: string;
}

export interface Acheteur {
  id: string;
  name: string;
}

export interface Offre {
  id: string;
  reference: string;
  objet: string;
  dateRemisDesPlis?: string;
  dataSource?: DataSource;
  acheteur?: Acheteur;
  image?: string;
  offreUrl?: string;
  concurrentRetenu?: string;
  montantTtc?: string;
}

export interface OffresResponse {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  items: Offre[];
}

export interface OffresQueryVariables {
  q?: string | null;
  dataSourceId?: string | null;
  acheteurId?: string | null;
  page: number;
  perPage: number;
}

export interface FilterState {
  q: string;
  dataSourceId: string;
  acheteurId: string;
  page: number;
  perPage: number;
  showResultsOnly: boolean;
}
