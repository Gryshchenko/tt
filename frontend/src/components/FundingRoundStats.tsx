import { useEffect, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import {  Space } from 'antd';
import Sceleton from './Sceleton';
import Empty from './Empty';
import { useQuery } from '@apollo/client';
import GET_FUNDING_ROUND_STATS from '../querys/getFundingRoundStats';
import formatNumber from '../utils/formatNumber';



const FundingRoundStats = () => {
    const [chartData, setChartData] = useState([]);

    const { data, loading, error } = useQuery(GET_FUNDING_ROUND_STATS);

    useEffect(() => {
        if (data) {
            const formattedData = data.fundingRoundAvg.map((item: {
                avgAmount: number;
                maxAmount: number;
                minAmount: number;
                roundCount: number;
            }) => ({
                name: item.roundCount,
                avgAmount: item.avgAmount,
                maxAmount: item.maxAmount,
                minAmount: item.minAmount,
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
                    <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis
                            domain={[0, (dataMax: number) => dataMax * 1.1]}
                            yAxisId="left"
                            tickFormatter={(value) => formatNumber(value)}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            tickFormatter={(value) => new Intl.NumberFormat().format(value)}
                        />
                        <Tooltip formatter={(value) => new Intl.NumberFormat().format(Number(value))} />
                        <Legend />
                        <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="avgAmount"
                            name="Average Amount"
                            stroke="#8884d8"
                            fill="#8884d8"
                        />
                        <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="maxAmount"
                            name="Max Amount"
                            stroke="#82ca9d"
                            fill="#82ca9d"
                        />

                        <Area
                            yAxisId="right"
                            type="monotone"
                            dataKey="minAmount"
                            name="Min Amount"
                            stroke="#ffc658"
                            fill="#ffc658"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Space>
        </>
    );
};

export default FundingRoundStats;