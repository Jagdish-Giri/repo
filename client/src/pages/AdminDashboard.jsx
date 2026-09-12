import { Link, Outlet } from 'react-router-dom';

export function AdminDashboard() {
  return (
    <section>
      <h2>Admin Dashboard</h2>
      <nav style={{ display: 'flex', gap: 12 }}>
        <Link to='/admin'>Overview</Link>
        <Link to='/inventory'>Inventory</Link>
        <Link to='/traffic'>Traffic</Link>
        <Link to='/system'>System</Link>
      </nav>
      <Outlet />
    </section>
  );
}
