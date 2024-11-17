import { gql } from "@apollo/client";

export const CREATE_PILOT = gql`
  mutation Mutation($newPilotData: InputPilotCreate!) {
    register(newPilotData: $newPilotData)
  }
`;
