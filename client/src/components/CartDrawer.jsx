import { useCartStore } from '../stores/cartStore';

export function CartDrawer() {
  const { items, drawerOpen, toggleDrawer, removeItem } = useCartStore();
  if (!drawerOpen) return null;
  return (
    <aside style={{ position: 'fixed', top: 0, right: 0, width: 320, height: '100vh', background: 'rgba(15,23,42,0.95)', color: '#fff', padding: 16 }}>
      <button onClick={() => toggleDrawer(false)}>Close</button>
      <h3>Cart</h3>
      {items.map((i, idx) => (
        <div key={`${i.productId}-${idx}`} style={{ marginBottom: 10 }}>
          <div>{i.name} x{i.quantity}</div>
          <button onClick={() => removeItem(idx)}>Remove</button>
        </div>
      ))}
    </aside>
  );
}
