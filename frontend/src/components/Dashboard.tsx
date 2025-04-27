import { Card, Col, Row } from 'antd';
import YearlyFundingSumChart from './YearlyFundingSumChart';
import FundingRoundStats from './FundingRoundStats';
import CompanyCountPerRoundChart from './CompanyCountPerRoundChart';
import DashboardStat from './DashboardGeneral';

const Dashboard = () => {
    return (
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <Card title="General information" style={{ height: '100%' }}>
                    <DashboardStat/>
                </Card>
            </Col>
            <Col span={12}>
                <Card title="Funding Rounds Over Time" style={{ height: '100%' }}>
                    <YearlyFundingSumChart />
                    <p>
                        A chart showing the number of funding rounds and amount conducted over the selected time period (e.g., by year or quarter).
                        This visualization helps analyze the activity levels of companies.
                    </p>
                </Card>
            </Col>
            <Col span={12}>
                <Card title="Number of Companies by Funding Round Count" style={{ height: '100%' }}>
                    <CompanyCountPerRoundChart />
                    <p>
                        A chart showing how many companies have participated in a specific number of funding rounds. This visualization helps analyze the distribution of companies based on their level of funding activity.
                    </p>
                </Card>
            </Col>
            <Col span={12}>
                <Card title="Funding Round Amounts by Number of Rounds per Organization" style={{ height: '100%' }}>
                    <FundingRoundStats />
                    <p>
                        A chart showing how the minimum, maximum, and average funding amounts vary depending on the number of funding rounds conducted by an organization. This visualization helps identify patterns between funding activity and the scale of investments.
                    </p>
                </Card>
            </Col>
        </Row>
    )
}

export default Dashboard;