
import { gql } from "@apollo/client";

const GET_FUNDING_ROUND_STATS = gql`
   query GetFundingRoundStat {
    fundingRoundAvg {
      roundCount
      minAmount
      maxAmount
      avgAmount
    }
  }
`;

export default GET_FUNDING_ROUND_STATS;