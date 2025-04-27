import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, Space } from 'antd';
import Sceleton from './Sceleton';
import Empty from './Empty';
import YEARLY_FUNDING_SUM from '../querys/getYearlyFundingSum';
import { useQuery } from '@apollo/client';
import formatNumber from '../utils/formatNumber';



const YearlyFundingSumChart = () => {
    const [chartData, setChartData] = useState([]);

    const { data, loading, error } = useQuery(YEARLY_FUNDING_SUM, {
        variables: { years: 5 },
    });

    useEffect(() => {
        if (data) {
            const formattedData = data.yearlyFundingSum.map((item: { period: string, totalAmount: number, fundingRoundsCount: number }) => ({
                name: item.period,
                totalAmount: item.totalAmount,
                fundingRoundsCount: item.fundingRoundsCount
            }));
            setChartData(formattedData);
        }
    }, [data]);

    if (loading) return <Sceleton />;
    if (error) {
        console.error(error)
        return <Empty />;
    }

    return (
        <>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis
                                yAxisId="left"
                                domain={[0, (dataMax: number) => dataMax * 1.1]}
                                tickFormatter={(value) => formatNumber(value)}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                tickFormatter={(value) => new Intl.NumberFormat().format(value)}
                            />
                            <Tooltip formatter={(value) => new Intl.NumberFormat().format(Number(value))} />
                            <Legend />
                            <Bar
                                yAxisId="left"
                                dataKey="totalAmount"
                                name="Total amount"
                                fill="#8884d8"
                            />
                            <Bar
                                yAxisId="right"
                                dataKey="fundingRoundsCount"
                                name="Total rounds"
                                fill="#82ca9d"
                            />
                        </BarChart>
                    </ResponsiveContainer>
            </Space>
        </>
    );
};

export default YearlyFundingSumChart;