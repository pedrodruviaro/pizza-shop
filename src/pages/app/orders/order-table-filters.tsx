import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {},
  } = useForm<OrderFiltersSchema>({
    resolver: zodResolver(orderFiltersSchema),
    defaultValues: {
      orderId: orderId ?? '',
      customerName: customerName ?? '',
      status: status ?? 'all',
    },
  })

  function handleFilter({ orderId, customerName, status }: OrderFiltersSchema) {
    setSearchParams((urlState) => {
      if (orderId) {
        urlState.set('orderId', orderId)
      } else {
        urlState.delete('orderId')
      }

      if (customerName) {
        urlState.set('customerName', customerName)
      } else {
        urlState.delete('customerName')
      }

      if (status) {
        urlState.set('status', status)
      } else {
        urlState.delete('status')
      }

      // resets pageIndex
      urlState.set('page', '1')
      return urlState
    })
  }

  function handleClearFilters() {
    setSearchParams((urlState) => {
      urlState.delete('orderId')
      urlState.delete('customerName')
      urlState.delete('status')
      urlState.set('page', '1')

      return urlState
    })

    reset({
      customerName: '',
      orderId: '',
      status: 'all',
    })
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit(handleFilter)}>
      <span className="text-sm font-semibold">Filtros:</span>

      <Input placeholder="ID do pedido" className="h-9 w-auto" {...register('orderId')} />

      <Input placeholder="Nome do cliente" className="h-9 w-[320px]" {...register('customerName')} />

      <Controller
        name="status"
        control={control}
        render={({ field: { value, name, onChange, disabled } }) => {
          return (
            <Select defaultValue="all" name={name} onValueChange={onChange} value={value} disabled={disabled}>
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em preparo</SelectItem>
                <SelectItem value="delivering">Em entrega</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />

      <Button type="submit" variant="secondary">
        <Search className="h-4 w-4 " />
        Filtrar resultados
      </Button>

      <Button type="button" variant="outline" onClick={handleClearFilters}>
        <X className="h-4 w-4 " />
        Remover filtros
      </Button>
    </form>
  )
}
