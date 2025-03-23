import { useQuery } from "@tanstack/react-query"

import { MetricType } from "@/schemas/metricSchema"

import { fetchMetricsByUserId } from "@/services/metricService"

export const useMetricsByUserId = (userId: string) =>
  useQuery<MetricType[], Error>({
    queryKey: ["metrics", userId],
    queryFn: () => fetchMetricsByUserId(userId),
    enabled: !!userId
  })
