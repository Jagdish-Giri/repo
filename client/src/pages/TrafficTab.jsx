import { useEffect } from 'react';
import { useAnalyticsStore } from '../stores/analyticsStore';

export function TrafficTab() {
  const { traffic, load } = useAnalyticsStore();
  useEffect(() => { load(); }, [load]);
  return <pre>{JSON.stringify(traffic, null, 2)}</pre>;
}
