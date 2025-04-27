import { useEffect, useState } from 'react';
import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, Space } from 'antd';
import Sceleton from './Sceleton';
import Empty from './Empty';
import { useQuery } from '@apollo/client';
import GET_COMPANY_COUNTPER_ROUND from '../querys/getCompanyCountPerRound';



const CompanyCountPerRoundChart = () => {
    const [chartData, setChartData] = useState([]);

    const { data, loading, error } = useQuery(GET_COMPANY_COUNTPER_ROUND);

    useEffect(() => {
        if (data) {
            const formattedData = data.companyCountPerRound.map((item: {
                round: number;
                companys: number;
            }) => ({
                name: item.round,
                companys: item.companys,
            }));
            setChartData(formattedData);
        }
    }, [data]);

    if (loading) return <Sceleton />;
    if (error) {
        console.error(error)
        return <Empty />;
    }
    const COLORS = [
        '#8884d8', '#82ca9d', '#ffc658', '#a4de6c', '#8dd1e1',
        '#ff8042', '#d0ed57', '#b0e0e6', '#ffbb28', '#d88884',
        '#84d8d8', '#c6b0e0'
    ];

    return (
        <>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={chartData}
                                dataKey="companys"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >

                                {chartData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => new Intl.NumberFormat().format(Number(value))} />
                            <Legend />
                        </PieChart>

                    </ResponsiveContainer>
            </Space>
        </>
    );
};

export default CompanyCountPerRoundChart;