import { useEffect, useState, FC } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import IFundingRound from '../interfaces/IFundingRound';
import { Space } from 'antd';

const FundingTrendChart: FC<{
    fundingRounds: IFundingRound[]
}> = ({ fundingRounds }: { fundingRounds: IFundingRound[] }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (fundingRounds) {
            const formattedData = fundingRounds.map((item: IFundingRound) => ({
                date: new Date(Number(item.createdAt)).toLocaleDateString(),
                totalFundingAmount: item.amount,
            }));
            setChartData(formattedData);
        }
    }, [fundingRounds]);


    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis 
                            tickFormatter={(value) => new Intl.NumberFormat().format(value)}
                     />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="totalFundingAmount" name='Total funding amount'  stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </Space>
    );
};

export default FundingTrendChart;
