import { useQuery } from "@apollo/client";
import { Table, Descriptions, DescriptionsProps, Row, Col, Card } from 'antd';
import { useParams } from 'react-router-dom';
import Sceleton from "./Sceleton";
import FUNDING_ROUND_QUERY from "../querys/fundingRounds";
import ORGANIZATION from "../querys/organization";
import FundingTrendChart from "./FundingTrendChar";
import Empty from "./Empty";
import OrganizationFundingStats from "./OrganizationFundingStats";


export default function FundingRoundTable() {
  const { id } = useParams();
  const { data, loading, error, refetch } = useQuery(FUNDING_ROUND_QUERY, {
    variables: { page: 1, pageSize: 10, organizationId: id, },
  });
  const { data: response } = useQuery(ORGANIZATION, {
    variables: { organizationId: id, },
  });
  if (loading) return <Sceleton />;
  if (error) {
    console.error(error)
    return <Empty />;
  }
  const columns = [
    {
      title: 'Founding round Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => {
        return `$${amount.toLocaleString()}`;
      }
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => {
        return new Date(Number(date)).toString();
      }
    },
  ];
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      children: <p>{response?.organization?.description}</p>,
    },
  ]

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title={response?.organization?.name} style={{ height: '100%' }}>
            <OrganizationFundingStats organizationId={id!}/>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Funding Trend Over Time" style={{ height: '100%' }}>
            <FundingTrendChart fundingRounds={data.fundingRounds?.items} />
            <p>
              A chart that shows how the funding amount changed over time. The X-axis represents time (e.g., month or year), and the Y-axis represents the funding amount. This will help identify trends in how investor interest in companies has changed.
            </p>
          </Card>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={data?.fundingRounds.items}
        loading={loading}
        pagination={{
          current: data?.fundingRounds.page,
          total: data?.fundingRounds.total,
          pageSize: data?.fundingRounds.pageSize,
          onChange: (page, pageSize) => {
            refetch({ page, pageSize });
          },
        }}
        rowKey="id"
      />
      <Descriptions title='Description' items={items} />
    </div>
  );
}
