import type { SupabaseClient } from '@supabase/supabase-js'

export type MetricName = 'allowed_count' | 'support_count' | 'approval_count' | 'blocked_count' | 'urgent_count' | 'lessons_started'

export async function incrementMetric(service: SupabaseClient | null, familyId: string, metric: MetricName) {
  if (!service) return
  await service.rpc('increment_family_metric', { target_family_id: familyId, metric_name: metric, amount: 1 })
}

export async function createNotification(
  service: SupabaseClient | null,
  values: { familyId: string; childId?: string; recipientRole: 'parent' | 'child'; kind: 'approval-created' | 'approval-resolved' | 'safety-flag' | 'access-change'; title: string; body: string },
) {
  if (!service) return
  await service.from('family_notifications').insert({
    family_id: values.familyId,
    child_id: values.childId ?? null,
    recipient_role: values.recipientRole,
    kind: values.kind,
    title: values.title,
    body: values.body,
  })
}
