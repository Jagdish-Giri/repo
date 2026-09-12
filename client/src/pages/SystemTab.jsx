import api from '../api/client';

export function SystemTab() {
  const toggle = async (enabled) => { await api.post('/admin/maintenance', { enabled }); };
  return <div><button onClick={() => toggle(true)}>Enable maintenance</button> <button onClick={() => toggle(false)}>Disable maintenance</button></div>;
}
