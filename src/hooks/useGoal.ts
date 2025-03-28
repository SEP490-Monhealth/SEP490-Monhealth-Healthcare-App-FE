import { useQuery } from "@tanstack/react-query"

import { GoalType } from "@/schemas/goalSchema"

import { fetchGoalsByUserId } from "@/services/goalService"

export const useGoalsByUserId = (userId: string) =>
  useQuery<GoalType[], Error>({
    queryKey: ["goals", userId],
    queryFn: () => fetchGoalsByUserId(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
