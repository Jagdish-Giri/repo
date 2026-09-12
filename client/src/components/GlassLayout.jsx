import { motion } from 'framer-motion';

export function GlassLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #0f172a, #1d4ed8)' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
        <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 16, padding: 20, color: '#fff' }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
