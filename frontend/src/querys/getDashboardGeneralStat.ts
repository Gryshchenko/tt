import { gql } from "@apollo/client";

const GET_DASHBOARD_GENERAL_STAT = gql`
    query GetDashboardGeneralStat {
        dashboardGeneralStat {
            companyCount
            totalFundingAmount
            avgRoundsCount
            maxRoundAmount
            maxRoundsCount
        }
    }
`;

export default GET_DASHBOARD_GENERAL_STAT;