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
