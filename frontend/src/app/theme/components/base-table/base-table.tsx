'use client';

import { Table } from '@mantine/core';
import { BaseSkeleton } from '../base-skeleton/base-skeleton';

export interface BaseTableColumn<T> {
  key: keyof T;
  title: string;
}

export interface BaseTableProps<T> {
  columns: BaseTableColumn<T>[];
  rows: T[];
  rowKey: keyof T;
  isLoading?: boolean;
}

const loadingRowCount = 5;

export function BaseTable<T>({ columns, rows, rowKey, isLoading }: BaseTableProps<T>) {
  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          {columns.map(column => (
            <Table.Th key={String(column.key)}>{column.title}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {isLoading
          ? Array.from({ length: loadingRowCount }, (_, index) => (
              <Table.Tr key={index}>
                {columns.map(column => (
                  <Table.Td key={String(column.key)}>
                    <BaseSkeleton height={14} />
                  </Table.Td>
                ))}
              </Table.Tr>
            ))
          : rows.map(row => (
              <Table.Tr key={String(row[rowKey])}>
                {columns.map(column => (
                  <Table.Td key={String(column.key)}>{String(row[column.key])}</Table.Td>
                ))}
              </Table.Tr>
            ))}
      </Table.Tbody>
    </Table>
  );
}
