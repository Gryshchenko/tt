

import { gql } from "@apollo/client";

const ORGANIZATIONS = gql`
   query GetOrganizations($page: Int, $pageSize: Int, $sort: [SortInput!], $filter: [FilterInput!]) {
    organizations(page: $page, pageSize: $pageSize, sort: $sort, filter: $filter) {
      items {
        id
        organizationName
        description
        fundingRoundCount
        totalFundingAmount
      }
      total
      page
      pageSize
    }
  }
`;

export default ORGANIZATIONS;