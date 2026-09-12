import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client';
import { useCartStore } from '../stores/cartStore';

export function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [variantId, setVariantId] = useState('');
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => { api.get('/products', { params: { limit: 100 } }).then((r) => {
    const found = r.data.data.items.find((p) => p._id === id);
    setProduct(found);
    if (found?.variants?.[0]) setVariantId(found.variants[0]._id);
  }); }, [id]);

  if (!product) return <p>Loading...</p>;
  return (
    <section>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <select value={variantId} onChange={(e) => setVariantId(e.target.value)}>
        {product.variants?.map((v) => <option key={v._id} value={v._id}>{v.name || v.sku} (${v.price || product.basePrice})</option>)}
      </select>
      <button onClick={() => addItem({ productId: product._id, variantId, quantity: 1, name: product.name })}>Add to cart</button>
    </section>
  );
}
