import { gql } from "@apollo/client";

const GET_ORGANIZATION_FUNDING_STATS = gql`
    query getOrganizationFundingStats($organizationId: String!) {
        organizationFundingStats(organizationId: $organizationId) {
            totalFundingAmount
            minAmount
            maxAmount
            avgAmount
            totalRounds
            firstRoundDate
            lastRoundDate
        }
    }
`;

export default GET_ORGANIZATION_FUNDING_STATS;