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
      airplane {
        airplane_name
      }
      departure_airport {
        code_ICAO
      }
      arrival_airport {
        code_ICAO
      }
      distance
      departure_time
      arrival_time
    }
  }
`;

export const GET_LAST_FLIGHT = gql`
  query GetLastFlight {
    getLastFlight {
      id
      distance
      departure_time
      arrival_time
      airplane {
        id
        airplane_name
        registration
      }
      departure_airport {
        code_ICAO
      }
      arrival_airport {
        code_ICAO
      }
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile {
    getProfile {
      id
      name
      email
      registration_date
    }
  }
`;
