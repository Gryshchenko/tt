import { useQuery, } from "@apollo/client";
import { Table,  InputNumber, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom'
import IOrganization from "../interfaces/IOrganization";
import Sceleton from "./Sceleton";
import Empty from "./Empty";
import { useState } from "react";
import buildSortOrder from "../utils/buildSortOrder";
import ISortItem from "../interfaces/ISortItem";
import ORGANIZATIONS from "../querys/organizations";
import MAX_FUNDING_ROUND_AMOUNT from "../querys/maxFundingRoundAmount";
import MAX_FUNDING_ROUND_COUNT from "../querys/maxFundingRoundCount";
import { FilterDropdownProps } from "antd/es/table/interface";
import buildFilters from "../utils/buildFilters";

export default function OrganizationTable() {
  const navigator = useNavigate();
  const [countMin, setCountMin] = useState<number | undefined>();
  const [countMax, setCountMax] = useState<number | undefined>();
  const [amountMin, setAmountMin] = useState<number | undefined>();
  const [amountMax, setAmountMax] = useState<number | undefined>();
  const { data, loading, error, refetch } = useQuery(ORGANIZATIONS, {
    variables: { page: 1, pageSize: 10, sort: null },
  });
  const { data: maxAmountObj } = useQuery(MAX_FUNDING_ROUND_AMOUNT);
  const { data: maxCountObj } = useQuery(MAX_FUNDING_ROUND_COUNT);

  const maxFundingRoundAmount = maxAmountObj?.maxFundingRoundAmount ?? 100000;
  const maxFundingRoundCount = maxCountObj?.maxFundingRoundCount ?? 20;


  if (loading) return <Sceleton />;
  if (error) {
    console.error(error)
    return <Empty />;
  }
  const columns = [
    {
      title: 'Organization Name',
      dataIndex: 'organizationName',
      key: 'organizationName',
      sorter: true,
      multiple: 1,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Total Funding Amount',
      dataIndex: 'totalFundingAmount',
      key: 'totalFundingAmount',
      sorter: true,
      multiple: 2,
      render: (amount: number) => {
        return `$${amount.toLocaleString()}`;
      },
      filterDropdown: ({ confirm, clearFilters, setSelectedKeys }: FilterDropdownProps) => (
        <div style={{ padding: 8 }}>
          <Space direction="vertical">
            <InputNumber
              min={0}
              placeholder="Min amount"
              value={amountMin}
              max={maxFundingRoundAmount}
              onChange={value => setAmountMin(value!)}
              style={{ width: '100%' }}
            />
            <InputNumber
              min={0}
              placeholder="Max amount"
              value={amountMax}
              max={maxFundingRoundAmount}
              onChange={value => setAmountMax(value!)}
              style={{ width: '100%' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  if (amountMin === undefined && amountMax === undefined) {
                    setSelectedKeys([]);
                  } else {
                    setSelectedKeys([`${amountMin ?? ''}-${amountMax ?? ''}`]);
                  }
                  confirm();
                }}
                size="small"
              >
                Apply
              </Button>
              <Button
                onClick={() => {
                  setAmountMin(undefined);
                  setAmountMax(undefined);
                  setSelectedKeys([]);
                  clearFilters!();
                }}
                size="small"
              >
                Reset
              </Button>
            </Space>
          </Space>
        </div>
      ),
    },
    {
      title: 'Funding Round Count',
      dataIndex: 'fundingRoundCount',
      key: 'fundingRoundCount',
      sorter: true,
      multiple: 3,
      filterDropdown: ({ confirm, clearFilters, setSelectedKeys }: FilterDropdownProps) => (
        <div style={{ padding: 8 }}>
          <Space direction="vertical">
            <InputNumber
              min={0}
              placeholder="Min count"
              value={countMin}
              max={maxFundingRoundCount}
              onChange={value => setCountMin(value!)}
              style={{ width: '100%' }}
            />
            <InputNumber
              min={0}
              placeholder="Max count"
              value={countMax}
              max={maxFundingRoundCount}
              onChange={value => setCountMax(value!)}
              style={{ width: '100%' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  if (countMin === undefined && countMax === undefined) {
                    setSelectedKeys([]);
                  } else {
                    setSelectedKeys([`${countMin ?? ''}-${countMax ?? ''}`]);
                  }
                  confirm();
                }}
                size="small"
              >
                Apply
              </Button>
              <Button
                onClick={() => {
                  setCountMin(undefined);
                  setCountMax(undefined);
                  clearFilters!();
                  setSelectedKeys([]);
                }}
                size="small"
              >
                Reset
              </Button>
            </Space>
          </Space>
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => (
        <span
        >
          {text.slice(0, 50)}...
        </span>
      ),
    },
  ];


  return (
    <>
      <Table
        columns={columns}
        dataSource={data?.organizations.items}
        loading={loading}
        onRow={(record: IOrganization) => {
          return {
            onClick: () => {
              navigator(`/organization/${record.id}`)
            },
            style: {
              cursor: 'pointer'
            }
          }
        }}
        onChange={(pagination, filters, sorter) => {
          refetch({
            page: pagination.current,
            pageSize: pagination.pageSize,
            sort: buildSortOrder(sorter as unknown as ISortItem[]),
            filter: buildFilters(filters as unknown as Record<string, string[]>)
          });
        }}
        pagination={{
          current: data?.organizations.page,
          total: data?.organizations.total,
          pageSize: data?.organizations.pageSize,
          onChange: (page, pageSize) => {
            refetch({ page, pageSize });
          },
        }}
        rowKey="id"
      />
    </>
  );
}
