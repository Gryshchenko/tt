import { Prisma, PrismaClient } from '@prisma/client';
import getFilteredOrganizations from './utils/getFilteredOrganizations';

const prisma = new PrismaClient();
type QuarterlyFundingEntry = [
  period: string,
  data: {
    totalAmount: number;
    fundingRoundsCount: number;
  }
];

export const resolvers = {
  Query: {
    fundingRounds: async (_parent, args) => {
      const { page = 1, pageSize = 20, organizationId } = args;
      const organization = await prisma.organization.findUnique({
        where: { id: organizationId },
      });
      if (!organization) {
        throw new Error('Organization not found');
      }

      const where = organizationId ? { organizationId } : {};


      const fundingRounds = await prisma.fundingRound.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where,
        include: {
          organization: {
            select: {
              name: true,
            },
          },

        },
      });

      const total = await prisma.fundingRound.count({ where });

      return {
        items: fundingRounds,
        total,
        page,
        pageSize,
      };
    },
    organization: async (_parent, args) => {
      const { organizationId } = args;
      const organization = await prisma.organization.findUnique({
        where: { id: organizationId },
      });
      return organization;
    },
    organizations: async (_parent, args) => {
      const { page = 1, pageSize = 20, sort, filter } = args;

      const allowedSortFields = ['fundingRoundCount', 'totalFundingAmount', 'organizationName'];

      const sortClauses = (sort ?? [])
        .filter(s => allowedSortFields.includes(s.field))
        .map(s => `"${s.field}" ${s.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'}`)
        .join(', ');
      const havingSqlString = getFilteredOrganizations(filter);

      const orderByClause = sortClauses.length > 0
        ? Prisma.raw(sortClauses)
        : Prisma.raw(`"totalFundingAmount" DESC`);
      const havingByClause = havingSqlString?.length > 0 ? Prisma.raw(havingSqlString) : '';

      const query = Prisma.sql`
        SELECT 
          o.id, 
          o.name AS "organizationName",
          o.description, 
          CAST(COUNT(fr.id) AS INTEGER) AS "fundingRoundCount",
          CAST(SUM(fr.amount) AS INTEGER) AS "totalFundingAmount"
        FROM "organization" o
        JOIN "funding_round" fr ON fr."organizationId" = o.id
        GROUP BY o.id
        ${havingByClause ? Prisma.sql`${havingByClause}` : Prisma.sql``}
        ORDER BY ${orderByClause}
        LIMIT ${pageSize}
        OFFSET ${(page - 1) * pageSize};
      `;

      const items = await prisma.$queryRaw(query);
      let total = null;
      if (havingByClause) {
        const countQuery = Prisma.sql`
          SELECT COUNT(*) as "totalCount" FROM (
            SELECT 
              o.id
            FROM "organization" o
            JOIN "funding_round" fr ON fr."organizationId" = o.id
            GROUP BY o.id
            ${havingByClause ? Prisma.sql`${havingByClause}` : Prisma.sql``}
          ) AS subquery;
        `;
        const res = await prisma.$queryRaw<{ totalCount: number }[]>(countQuery);
        total = Number(res[0].totalCount);
      } else {
        total = await prisma.organization.count();
      }

      return {
        //@ts-ignore
        items: items.map((item) => ({
          ...item,
          description: item.description.slice(0, 50),
          fundingRoundCount: Number(item.fundingRoundCount) ?? 0,
          totalFundingAmount: Number(item.totalFundingAmount) ?? 0,
        })),
        total,
        page,
        pageSize,
      };
    },
    maxFundingRoundAmount: async () => {
      const result = await prisma.fundingRound.groupBy({
        by: ['organizationId'],
        _sum: {
          amount: true,
        },
        orderBy: {
          _sum: {
            amount: 'desc'
          }
        },
        take: 1,
      });
      return result[0]._sum.amount ?? 0;
    },
    maxFundingRoundCount: async () => {
      const result = await prisma.fundingRound.groupBy({
        by: ['organizationId'],
        _count: {
          id: true,
        },
        orderBy: {
          _count: {
            id: 'desc',
          },
        },
        take: 1,
      });

      return result[0]?._count.id ?? 0;
    },
    yearlyFundingSum: async (_parent) => {

      const fundingRounds = await prisma.fundingRound.findMany({
        select: { createdAt: true, amount: true }
      });

      const quarterlyFunding = Object.entries(
        fundingRounds.reduce((acc, { createdAt, amount }) => {
          const date = new Date(createdAt);
          const year = date.getFullYear();
          const quarter = Math.ceil((date.getMonth() + 1) / 3);
          const period = `${year} Q${quarter}`;

          if (!acc[period]) {
            acc[period] = { totalAmount: 0, fundingRoundsCount: 0 };
          }

          acc[period].totalAmount += amount;
          acc[period].fundingRoundsCount += 1;

          return acc;
        }, {})
      ).map(([period, { totalAmount, fundingRoundsCount }]: QuarterlyFundingEntry) => ({
        period,
        totalAmount,
        fundingRoundsCount
      }))
        .sort((a, b) => {
          const [yearA, quarterA] = a.period.split(" Q").map(Number);
          const [yearB, quarterB] = b.period.split(" Q").map(Number);
          return yearA - yearB || quarterA - quarterB;
        });

      return quarterlyFunding;
    },
    fundingRoundAvg: async () => {
      const query = Prisma.sql`
        WITH OrganizationRoundCounts AS (
          SELECT 
            o.id AS organizationId,
            COUNT(fr.id) AS roundCount
          FROM "organization" o
          JOIN "funding_round" fr ON fr."organizationId" = o.id
          GROUP BY o.id
        ),
        FundingRoundStats AS (
          SELECT
            orc.roundCount,
            MIN(fr.amount) AS minAmount,
            MAX(fr.amount) AS maxAmount,
            AVG(fr.amount) AS avgAmount
          FROM "organization" o
          JOIN "funding_round" fr ON fr."organizationId" = o.id
          JOIN OrganizationRoundCounts orc ON orc.organizationId = o.id
          GROUP BY orc.roundCount
        )
        SELECT 
          CAST(roundCount as REAL) as roundCount,
          CAST(minAmount as REAL) as minAmount,
          CAST(maxAmount as REAL) as maxAmount,
          ROUND(avgAmount) as avgAmount
        FROM FundingRoundStats
        ORDER BY roundCount;
      `;

      const result = await prisma.$queryRaw(query);
      return result;
    },
    companyCountPerRound: async () => {
      const query = Prisma.sql`SELECT 
        CAST(currentRound AS REAL) as round,
         CAST(COUNT(*) AS REAL) as companys 
          FROM (
          SELECT "organizationId", COUNT(*) AS currentRound
          FROM "funding_round"
          GROUP BY "organizationId"
        ) AS sub
      GROUP BY currentRound
      ORDER BY currentRound ASC;`
      const result = await prisma.$queryRaw(query);
      return result;
    },
    dashboardGeneralStat: async function () {

      const companyCount = await prisma.organization.count();

      const totalFundingAmount = await prisma.fundingRound.aggregate({
        _sum: {
          amount: true,
        },
      });

      const maxFundingRounds = await prisma.organization.findMany({
        select: {
          id: true,
          fundingRounds: true,
        },
      });

      const maxRoundsCount = await this.maxFundingRoundCount()
      const avgRoundsCount = maxFundingRounds.reduce((acc, org) => acc + org.fundingRounds.length, 0) / maxFundingRounds.length;

      const maxRoundAmount = await prisma.fundingRound.aggregate({
        _max: {
          amount: true,
        },
      });

      return {
        companyCount,
        totalFundingAmount: totalFundingAmount._sum.amount,
        avgRoundsCount,
        maxRoundAmount: maxRoundAmount._max.amount,
        maxRoundsCount
      };
    },
    organizationFundingStats: async (_parent, args) => {
      const { organizationId } = args;
      const fundingRounds = await prisma.fundingRound.findMany({
        where: {
          organizationId: organizationId,
        },
        select: {
          amount: true,
          createdAt: true,
        },
      });

      const totalFundingAmount = fundingRounds.reduce((sum, round) => sum + round.amount, 0);

      const amounts = fundingRounds.map((round) => round.amount);
      const minAmount = Math.min(...amounts);
      const maxAmount = Math.max(...amounts);
      const avgAmount = totalFundingAmount / fundingRounds.length;

      const sortedRounds = fundingRounds.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      const firstRoundDate = sortedRounds[0]?.createdAt;
      const lastRoundDate = sortedRounds[sortedRounds.length - 1]?.createdAt;

      return {
        totalFundingAmount,
        minAmount,
        maxAmount,
        avgAmount,
        firstRoundDate,
        lastRoundDate,
        totalRounds: fundingRounds.length,
      };
    }
  },
};
