
import { gql } from "@apollo/client";

const GET_COMPANY_COUNTPER_ROUND = gql`
   query GetCompanyCountPerRound {
    companyCountPerRound {
      round
      companys
    }
  }
`;

export default GET_COMPANY_COUNTPER_ROUND;