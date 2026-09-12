import { useEffect } from 'react';
import { useAnalyticsStore } from '../stores/analyticsStore';

export function AdminOverviewTab() {
  const { commandCenter, load } = useAnalyticsStore();
  useEffect(() => { load(); }, [load]);
  if (!commandCenter) return <p>Loading...</p>;
  return <pre>{JSON.stringify(commandCenter, null, 2)}</pre>;
}
