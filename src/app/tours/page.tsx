'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ITour, initTour } from '@/types/ITour'
import { createColumnHelper } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import TourList from './table'
import { ReloadIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { useMemo, useState } from 'react'

const columnHelper = createColumnHelper<ITour>()

const Page = () => {
  const [count, setCount] = useState(0)

  const ColumsAction = useMemo(() => {
    return columnHelper.group({
      id: 'actions',
      enableHiding: false,
      cell: () => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Copy payment ID</DropdownMenuItem>
              <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  variant={'default'}
                  className="bg-red-500 text-white w-full"
                  size={'sm'}
                >
                  Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      header: 'Thao tác',
    })
  }, [])

  const handleReload = () => {
    setCount(count + 1)
  }

  return (
    <>
      <div className="w-full relative flex flex-col items-start md:flex-row md:items-center justify-between">
        <h3 className="text-1xl font-bold leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]">
          Danh sách Tour
        </h3>

        <div className="flex align-middle gap-2">
          <Button variant={'outline'} size={'sm'} onClick={handleReload}>
            <ReloadIcon className="me-2" />
            Reload
          </Button>

          <Link
            href={'/tours/create'}
            className={cn(buttonVariants({ variant: 'default', size: 'sm' }))}
          >
            Tạo mới
          </Link>
        </div>
      </div>

      <TourList data={[initTour]} columnsAction={ColumsAction} />
    </>
  )
}

export default Page
