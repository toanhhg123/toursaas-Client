import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ITour } from '@/types/ITour'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { format } from 'date-fns'

import React from 'react'

interface Props {
  columnsAction?: ColumnDef<ITour, unknown>
  data: ITour[]
}

const TourList = ({ columnsAction, data }: Props) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  if (columnsAction) columns.push(columnsAction)

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  console.log('table render')

  return (
    <>
      <div className="w-full mt-3">
        <div className="rounded-md border">
          <Table className="w-full rounded-none border-collapse border border-slate-200">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="border border-slate-200"
                          colSpan={header.colSpan}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className="border border-slate-200"
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Chưa có dữ liệu nào.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

const columnHelper = createColumnHelper<ITour>()

const columns: ColumnDef<ITour, unknown>[] = [
  columnHelper.group({
    id: 'group 1',
    header: () => <span>Thông tin chung</span>,
    columns: [
      columnHelper.accessor('name', {
        cell: (info) => info.getValue(),
        header: 'Tên tour',
      }),
      columnHelper.accessor((row) => row.goDate, {
        id: 'godat',
        cell: (info) => format(info.getValue(), 'dd/MM/yyyy'),
        header: () => <span>Ngày đi</span>,
      }),
      columnHelper.accessor('duration', {
        cell: (info) => {
          return info.getValue()
        },
        header: 'Thời gian',
      }),
    ],
  }),

  columnHelper.group({
    id: 'group 2',
    header: () => <span>Thông tin người hướng dẫn</span>,
    columns: [
      columnHelper.accessor('tourGuide', {
        cell: (info) => {
          return info.getValue().email
        },
        header: 'HD Viên',
      }),
      columnHelper.accessor((row) => row.tourMan, {
        header: 'Quản lí Tour',
        cell: (info) => info.getValue().email,
      }),
    ],
  }),

  columnHelper.group({
    id: 'group 3',
    header: () => <span>Phương tiện & Chỗ ở</span>,
    columns: [
      columnHelper.accessor('goFlight', {
        cell: (info) => {
          return info.getValue()
        },
        header: 'số hiệu(đi)',
      }),
      columnHelper.accessor('returnFlight', {
        header: 'số hiệu(về)',
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor('transport', {
        header: 'Phương tiện',
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor('hotelClass', {
        header: 'Hạng khách sạn',
        cell: (info) => info.getValue() + '*  ',
      }),
    ],
  }),
]

export default TourList
