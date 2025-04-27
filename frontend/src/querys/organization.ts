

import { gql } from "@apollo/client";

const ORGANIZATION = gql`
   query GetOrganization($organizationId: String) {
    organization(organizationId: $organizationId) {
      id
      name
      description
    }
  }
`;

export default ORGANIZATION;