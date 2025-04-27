
import { gql } from "@apollo/client";

const FUNDING_ROUND_QUERY = gql`
   query GetFundingRounds($page: Int, $pageSize: Int, $organizationId: String) {
    fundingRounds(page: $page, pageSize: $pageSize, organizationId: $organizationId) {
      items {
        id
        name
        amount
        createdAt
      }
      total
      page
      pageSize
    }
  }
`;

export default FUNDING_ROUND_QUERY;