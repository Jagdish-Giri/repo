import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCatalogStore } from '../stores/catalogStore';

export function StorefrontPage() {
  const { products, loading, filters, setFilters, fetchProducts } = useCatalogStore();
  useEffect(() => { fetchProducts(); }, [filters.q, filters.tags, fetchProducts]);
  return (
    <section>
      <h2>Catalog</h2>
      <input placeholder='Search' value={filters.q} onChange={(e) => setFilters({ q: e.target.value })} />
      <input placeholder='Tags (comma)' value={filters.tags} onChange={(e) => setFilters({ tags: e.target.value })} />
      {loading ? <p>Loading...</p> : products.map((p) => (
        <div key={p._id} style={{ borderBottom: '1px solid #ccc', padding: 8 }}>
          <Link to={`/product/${p._id}`}>{p.name}</Link> - ${p.basePrice}
        </div>
      ))}
    </section>
  );
}
