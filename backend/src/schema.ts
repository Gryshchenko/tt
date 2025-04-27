import { gql } from "apollo-server-express";

export const typeDefs = gql`
type Organization {
  id: ID!
  organizationName: String!
  description: String!
  fundingRoundCount: Int!
  totalFundingAmount: Int!
  fundingRounds: [FundingRound!]!
}

type OrganizationDetail {
  id: ID!
  name: String!
  description: String!
}

type FundingRound {
  id: String!
  name: String!
  amount: Int!
  createdAt: String!
  organization: Organization
}

type FundingRoundPage {
  items: [FundingRound!]!
  total: Int!
  page: Int!
  pageSize: Int!
}

type OrganizationsPage {
  items: [Organization!]!
  total: Int!
  page: Int!
  pageSize: Int!
}

input SortInput {
  field: String!
  order: String!
}
input FilterInput {
  field: String!
  min: Int
  max: Int
}

type YearlyFunding {
  period: String!
  totalAmount: Int!
  fundingRoundsCount: Int!
}

type FundingRoundAvgType {
  roundCount: Int!
  minAmount: Int!
  maxAmount: Int!
  avgAmount: Int!
}

type CompanyCountPerRoundType {
  round: Int
  companys: Int!
}

type DashboardGeneralStat {
  companyCount: Int!
  totalFundingAmount: Float!
  avgRoundsCount: Float!
  maxRoundAmount: Float!
  maxRoundsCount: Float!
}

type FundingRoundSum {
  name: String!
  sumAmount: Float!
}

type OrganizationFundingStatsType {
  totalFundingAmount: Int!
  minAmount: Int!
  maxAmount: Int!
  avgAmount: Float!
  totalRounds: Int!
  firstRoundDate: String!
  lastRoundDate: String!
}

type Query {
  fundingRounds(page: Int, pageSize: Int, organizationId: String): FundingRoundPage!
  organizations(page: Int, pageSize: Int, sort: [SortInput!], filter: [FilterInput!]): OrganizationsPage!
  organization(organizationId: String): OrganizationDetail!
  maxFundingRoundCount: Int!
  maxFundingRoundAmount: Int!
  yearlyFundingSum(years: Int!): [YearlyFunding!]
  fundingRoundAvg: [FundingRoundAvgType!]
  companyCountPerRound: [CompanyCountPerRoundType!]
  dashboardGeneralStat: DashboardGeneralStat!
  organizationFundingStats(organizationId: String): OrganizationFundingStatsType!
}
`;