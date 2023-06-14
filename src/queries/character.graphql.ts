import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        next
      }
      results {
        id
        image
        name
        gender
      }
    }
  }
`;

export const GET_FULL_CHARACTER = gql`
  query GetFullCharacter($id: ID!) {
    character(id: $id) {
      status
      species
      type
      location {
        name
      }
      episode {
        name
        air_date
        episode
      }
    }
  }
`;
