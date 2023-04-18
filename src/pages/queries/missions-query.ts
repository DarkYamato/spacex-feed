import { gql } from "@apollo/client";

export const GET_MISSIONS = gql`
  query Missions($offset: Int!, $limit: Int!) {
    launches(offset: $offset, limit: $limit) {
      id
      mission_name
      launch_date_unix
      details
      links {
        presskit
      }
      rocket {
        rocket_name
      }
    }
  }
`
