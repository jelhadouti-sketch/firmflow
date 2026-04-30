export const PLAN_LIMITS = {
  starter: {
    maxTeamMembers: 5,
    maxDocuments: 50,
    maxClients: 25,
    hasAI: false,
    hasAnalytics: false,
    hasRecurring: false,
    hasExport: false,
    has2FA: false,
    hasBranding: false,
  },
  pro: {
    maxTeamMembers: 20,
    maxDocuments: Infinity,
    maxClients: Infinity,
    hasAI: true,
    hasAnalytics: true,
    hasRecurring: true,
    hasExport: true,
    has2FA: true,
    hasBranding: true,
  }
}

export function getPlanLimits(plan: string) {
  return PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS] || PLAN_LIMITS.starter
}
