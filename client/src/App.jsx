import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { GlassLayout } from './components/GlassLayout';
import { CartDrawer } from './components/CartDrawer';
import { StorefrontPage } from './pages/StorefrontPage';
import { ProductPage } from './pages/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminOverviewTab } from './pages/AdminOverviewTab';
import { InventoryTab } from './pages/InventoryTab';
import { TrafficTab } from './pages/TrafficTab';
import { SystemTab } from './pages/SystemTab';

function App() {
  return (
    <BrowserRouter>
      <GlassLayout>
        <Routes>
          <Route path='/' element={<StorefrontPage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route element={<AdminDashboard />}>
            <Route path='/admin' element={<AdminOverviewTab />} />
            <Route path='/inventory' element={<InventoryTab />} />
            <Route path='/traffic' element={<TrafficTab />} />
            <Route path='/system' element={<SystemTab />} />
          </Route>
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
        <CartDrawer />
      </GlassLayout>
    </BrowserRouter>
  );
}

export default App;
