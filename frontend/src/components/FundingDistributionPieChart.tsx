import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import IOrganization from '../interfaces/IOrganization';
import { Card, Space } from 'antd';


const FundingDistributionPieChart = ({data}: {data: IOrganization[]}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (data) {
            const formattedData = data.map((item: IOrganization) => {
                const totalFundingAmount = item.totalFundingAmount
                return {
                    name: item.organizationName,
                    value: totalFundingAmount,
                };
            });
            setChartData(formattedData);
        }
    }, [data]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347'];

    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Card title="Funding Distribution by Company Type" size="small">
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            label
                        >
                            {
                                chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))
                            }
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
                <p>
                  This chart is well-suited for displaying the share of each company type in the total funding amount. 
                </p>
            </Card>
        </Space>
    );
};

export default FundingDistributionPieChart;
