
import { gql } from "@apollo/client";

const MAX_FUNDING_ROUND_AMOUNT = gql`
   query getMaxFundingRoundAmount {
    maxFundingRoundAmount
  }
`;

export default MAX_FUNDING_ROUND_AMOUNT;