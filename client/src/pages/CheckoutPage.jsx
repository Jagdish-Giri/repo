import api from '../api/client';
import { useCartStore } from '../stores/cartStore';

export function CheckoutPage() {
  const { items, clear } = useCartStore();
  const submit = async () => {
    const idem = globalThis.crypto?.randomUUID?.() || String(Date.now());
    await api.post('/orders/reserve', { items });
    await api.post('/orders/checkout', { items }, { headers: { 'idempotency-key': idem } });
    clear();
    alert('Order created');
  };
  return (
    <section>
      <h2>Checkout</h2>
      <pre>{JSON.stringify(items, null, 2)}</pre>
      <button disabled={!items.length} onClick={submit}>Reserve & Checkout</button>
    </section>
  );
}
