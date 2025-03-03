import { gql } from "@apollo/client";

export const GET_ALL_AIRPLANES = gql`
  query GetAllAirplane {
    getAllAirplane {
      id
      airplane_name
    }
  }
`;

export const GET_ALL_AIRPORTS = gql`
  query GetAllAirports {
    getAllAirports {
      id
      airport_name
      code_ICAO
    }
  }
`;

export const GET_ALL_FLIGHTS = gql`
  query GetAllFlights {
    getAllFlights {
      distance
      departure_time
      arrival_time
    }
  }
`;
