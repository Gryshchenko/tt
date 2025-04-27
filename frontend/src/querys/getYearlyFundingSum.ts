
import { gql } from "@apollo/client";

const YEARLY_FUNDING_SUM = gql`
   query GetYearlyFundingSum($years: Int!) {
    yearlyFundingSum(years: $years) {
      period 
      totalAmount
      fundingRoundsCount
    }
  }
`;

export default YEARLY_FUNDING_SUM;