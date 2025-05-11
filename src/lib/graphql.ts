
import { gql } from 'graphql-request';

export const GRAPHQL_ENDPOINT = `https://procurement.edoffice.online/graphql/`;

export const FETCH_OFFRES_QUERY = gql`
  query AllOffres(
    $q: String,
    $acheteurId: ID,
    $dataSourceId: ID,
    $page: Int,
    $perPage: Int
  ) {
    allOffres(
      reference: $q,
      objetContains: $q,
      acheteurId: $acheteurId,
      dataSourceId: $dataSourceId,
      page: $page,
      perPage: $perPage
    ) {
      totalCount
      totalPages
      currentPage
      items {
        id
        reference
        objet
        dateRemisDesPlis
        dataSource { id title image url }
        acheteur { id name }
        image
        offreUrl
        concurrentRetenu
        montantTtc
      }
    }
  }
`;

export const FETCH_ACHETEURS_QUERY = gql`
  query AllAcheteurs {
    allAcheteurs {
      id
      name
    }
  }
`;

export const GET_DATASOURCES = gql`
  query {
    allDataSources {
      id
      title
      url
      image
    }
  }
`;
