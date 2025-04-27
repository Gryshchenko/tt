
import { gql } from "@apollo/client";

const MAX_FUNDING_ROUND_COUNT = gql`
   query getMaxFundingRoundCount {
    maxFundingRoundCount
  }
`;

export default MAX_FUNDING_ROUND_COUNT;