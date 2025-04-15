import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'
import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthRevenueCard() {
  const { data: monthRevenue } = useQuery({
    queryKey: ['metrics', 'month-revenue'],
    queryFn: getMonthRevenue,
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center space-y-0 justify-between pb-2">
          <CardTitle className="text-base font-semibold">Receita Total (mês)</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {monthRevenue ? (
            <>
              <span className="text-2xl font-bold tracking-tight">
                {(monthRevenue.receipt / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
              <p className="text-xs text-muted-foreground">
                {monthRevenue.diffFromLastMonth >= 0 ? (
                  <span className="text-emerald-500 dark:text-emerald-400">+{monthRevenue.diffFromLastMonth}%</span>
                ) : (
                  <span className="text-rose-500 dark:text-rose-400">{monthRevenue.diffFromLastMonth}%</span>
                )}{' '}
                em relação ao mês passado
              </p>
            </>
          ) : (
            <MetricCardSkeleton />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
