import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import IOrganization from '../interfaces/IOrganization';
import { Card, Space } from 'antd';



const FundingChartAmountByCompany = ({ data }: { data: IOrganization[] }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (data) {
            const formattedData = data.map((item: IOrganization) => ({
                name: item.organizationName,
                totalFundingAmount: item.totalFundingAmount,
            }));
            setChartData(formattedData);
        }
    }, [data]);

    return (
        <>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Card title="Total Funding per Company" size="small">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="totalFundingAmount" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                    <p>
                        This chart can show how much each company received in different rounds. The X-axis represents companies, and the Y-axis represents the total funding amount. It will help identify which companies attracted the most investments.
                    </p>
                </Card>
            </Space>
        </>
    );
};

export default FundingChartAmountByCompany;