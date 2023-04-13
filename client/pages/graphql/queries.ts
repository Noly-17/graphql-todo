import { gql } from "@apollo/client";

export const LOAD_TODOS = gql`
  query {
    todos {
      id
      task
      completed
    }
  }
`;
