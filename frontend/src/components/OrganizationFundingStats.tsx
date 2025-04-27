import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Card, Row, Col, Statistic, Typography } from 'antd';
import GET_ORGANIZATION_FUNDING_STATS from '../querys/getOrganizationFundingStats';
import Sceleton from './Sceleton';
import Empty from './Empty';

const { Title } = Typography;

const OrganizationFundingStats: React.FC<{ organizationId: string }> = ({ organizationId }) => {
  const [fundingStats, setFundingStats] = useState<any>(null);

  const { loading, error, data } = useQuery(GET_ORGANIZATION_FUNDING_STATS, {
    variables: { organizationId },
  });

  useEffect(() => {
    if (data) {
  console.log(data);
      setFundingStats(data.organizationFundingStats);
    }
  }, [data]);

  if (loading) return <Sceleton />;
  if (error) {
    console.error(error)
    return <Empty />;
  }

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Funding Rounds"
              value={fundingStats?.totalRounds}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Funding Amount"
              value={fundingStats?.totalFundingAmount?.toFixed(2)}
              prefix="$"
              valueStyle={{ color: '#cf1322', fontSize: 21 }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Average Funding"
              value={fundingStats?.avgAmount?.toFixed(2)}
              prefix="$"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Max Funding"
              value={fundingStats?.maxAmount}
              prefix="$"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={12}>
          <Card title="Additional Info" bordered={false}>
            <p><strong>Min Funding: </strong>{fundingStats?.minAmount?.toFixed(2).toLocaleString()}</p>
            <p><strong>First Round Date: </strong>{new Date(Number(fundingStats?.firstRoundDate)).toDateString()}</p>
            <p><strong>Last Round Date: </strong>{new Date(Number(fundingStats?.lastRoundDate)).toDateString()}</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrganizationFundingStats;
