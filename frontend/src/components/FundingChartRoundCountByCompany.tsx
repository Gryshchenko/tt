import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import IOrganization from '../interfaces/IOrganization';
import { Card, Space } from 'antd';


const FundingChartRoundCountByCompany = ({data}: {data: IOrganization[]}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (data) {
            const formattedData = data.map((item: IOrganization) => ({
                name: item.organizationName,
                fundingRoundCount: item.fundingRoundCount,
            }));
            setChartData(formattedData);
        }
    }, [data]);


    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Card title="Funding Rounds per Company" size="small">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="fundingRoundCount" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
                <p>
                    This chart can show how many funding rounds each company had. It will help understand how many times each company attracted investments.
                </p>
            </Card>
        </Space>
    );
};

export default FundingChartRoundCountByCompany;