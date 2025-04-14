import { api } from '@/lib/axios'

interface ApproveOrderParams {
  orderId: string
}

export async function ApproveOrder({ orderId }: ApproveOrderParams) {
  await api.patch(`/orders/${orderId}/approve`)
}
