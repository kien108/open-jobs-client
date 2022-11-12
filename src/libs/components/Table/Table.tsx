import React, { useMemo } from 'react';
import { TableProps as AntTableProps } from 'antd';
import { Pagination } from './Pagination';
import { StyledTable } from './styles';
import {
  FilterValue,
  SorterResult,
  SortOrder,
  TableCurrentDataSource,
  TablePaginationConfig
} from 'antd/lib/table/interface';
import useTable, { IParams } from './hooks/useTable';
import { findIndex } from 'lodash';
import { ColumnType } from 'antd/es/table';

export interface TableInstanceProps {
  onSort: (sort: SorterResult<any> | SorterResult<any[]>) => void;
  setParams: any;
  params: IParams;
  sort: any;
  setSearchParams: any;
  searchParams: any;
}

interface TableProps extends AntTableProps<any> {
  tableInstance: TableInstanceProps;
  totalElements: number;
  totalItems?: number;
  totalPages: number;
  loading: boolean;
  bordered?: boolean;
  showPagination?: boolean;
}

const Table = ({ tableInstance, showPagination = true, ...props }: TableProps) => {
  const {
    sort: { sortBy, sortDirection }
  } = tableInstance;

  const handleChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any[]>,
    extra: TableCurrentDataSource<any>
  ) => {
    props.onChange && props.onChange(pagination, filters, sorter, extra);
    tableInstance?.onSort && tableInstance.onSort(sorter);
  };
  const convertedColumns = useMemo(() => {
    const newColumns = [...(props.columns as ColumnType<any>[])];
    if (sortBy && sortDirection) {
      const index = findIndex(props.columns, { dataIndex: sortBy });

      if (index !== -1) {
        newColumns[index].defaultSortOrder = sortDirection as SortOrder;
      }
    }
    return newColumns.map((column) =>
      column.align
        ? { ...column, className: column.className + ' custom-align-' + column.align }
        : column
    );
  }, [props.columns, sortBy, sortDirection]);

  return (
    <>
      <StyledTable
        pagination={false}
        {...props}
        columns={convertedColumns}
        showSorterTooltip={false}
        onChange={handleChange}
      />
      {showPagination && (
        <Pagination
          tableInstance={tableInstance}
          total={props.totalPages}
          totalElements={props.totalElements}
        />
      )}
    </>
  );
};

Table.useTable = useTable;

export default Table;
