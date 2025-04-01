import { gql } from "@apollo/client";

export const CREATE_PILOT = gql`
  mutation Mutation($newPilotData: InputPilotCreate!) {
    register(newPilotData: $newPilotData)
  }
`;

export const LOGIN_PILOT = gql`
  mutation Login($loginData: InputPilotLogin!) {
    login(loginData: $loginData) {
      token
    }
  }
`;

export const CREATE_FLIGHT_MUTATION = gql`
  mutation CreateFlight($data: CreateFlightInput!) {
    createFlight(data: $data) {
      id
      airplane {
        id
        airplane_name
      }
      departure_airport {
        id
        airport_name
        code_ICAO
      }
      arrival_airport {
        id
        airport_name
        code_ICAO
      }
      distance
      departure_time
      arrival_time
      number_of_passangers
      fuel_quantity
      comment
    }
  }
`;
