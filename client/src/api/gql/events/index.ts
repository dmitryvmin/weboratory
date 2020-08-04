import gql from "graphql-tag";

export const All_EVENTS = gql`
  query AllEventsList {
    findAll  {
      visibility
      eventId
      coordinates
      updatedAt
      createdAt
      address
      title
      status
    }
  }
`;