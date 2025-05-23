import { Helmet } from 'react-helmet-async'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { OrderTableRow } from './order-table-row'
import { OrderTableFilters } from './order-table-filters'
import { Pagination } from '@/components/pagination'
import { useQuery } from '@tanstack/react-query'
import { getOrders } from '@/api/get-orders'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { OrderTableSkeleton } from './order-table-skeleton'

export function Orders() {
  const [searchParams, setSearchParmas] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  // searchParams.get('page') ?? 0 if page starts with 1 is fine
  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: result, isLoading: isLoadingOrders } = useQuery({
    // calls queryFn every time 'pageIndex' changes (not remake the fetch if the previous page is loaded. Uses from cache)
    // queryKey: ['orders', pageIndex],

    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () => getOrders({ pageIndex, orderId, customerName, status: status === 'all' ? null : status }),
  })

  function handlePaginate(pageIndex: number) {
    setSearchParmas((urlState) => {
      urlState.set('page', (pageIndex + 1).toString())
      return urlState
    })
  }

  return (
    <>
      <Helmet title="Pedidos" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoadingOrders && <OrderTableSkeleton />}

                {result && result.orders.map((order) => <OrderTableRow key={order.orderId} order={order} />)}
              </TableBody>
            </Table>
          </div>

          {result && (
            <Pagination
              pageIndex={result.meta.pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
              onPageChange={handlePaginate}
            />
          )}
        </div>
      </div>
    </>
  )
}
