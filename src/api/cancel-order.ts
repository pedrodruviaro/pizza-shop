import { api } from '@/lib/axios'

interface CandelOrderParams {
  orderId: string
}

export async function cancelOrder({ orderId }: CandelOrderParams) {
  await api.patch(`/orders/${orderId}/cancel`)
}
