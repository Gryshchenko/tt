import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table } from 'antd';
import { useQuery } from '@apollo/client';
import GET_DASHBOARD_GENERAL_STAT from '../querys/getDashboardGeneralStat';
import Sceleton from './Sceleton';
import Empty from './Empty';

const DashboardStat: React.FC = () => {
    const { loading, error, data } = useQuery(GET_DASHBOARD_GENERAL_STAT);
    const [, setTableData] = useState<any[]>([]);

    useEffect(() => {
        if (data) {
            setTableData(data.dashboardGeneralStat.fundingRoundSums);
        }
    }, [data]);

    if (loading) return <Sceleton />;
    if (error) {
        console.error(error)
        return <Empty />;
    }


    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic title="Companies Count" value={data?.dashboardGeneralStat.companyCount} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Total Funding Amount"
                            value={data?.dashboardGeneralStat.totalFundingAmount}
                            prefix="$"
                            precision={2}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="Max Funding Rounds" value={data?.dashboardGeneralStat.maxRoundsCount} />
                    </Card>
                </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: 20 }}>
                <Col span={12}>
                    <Card>
                        <Statistic title="Average Rounds Count" value={data?.dashboardGeneralStat.avgRoundsCount} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="Max Round Amount"
                            value={data?.dashboardGeneralStat.maxRoundAmount}
                            prefix="$"
                            precision={2}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DashboardStat;
