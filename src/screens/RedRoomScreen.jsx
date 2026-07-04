import React, { useState } from 'react'

export default function RedRoomScreen({ navigate, StatusBar, BottomNav }) {
  const [tab, setTab] = useState('delivery')
  const [collected, setCollected] = useState(false)

  return (
    <>
      <StatusBar />
      <div className="nav-bar">
        <button className="btn-ghost" onClick={() => navigate('home')}>←</button>
        <span className="nav-title">Red Room</span>
        <span className="tag tag-red">Active</span>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid #E8E8E8', background: '#fff', flexShrink: 0 }}>
        {[
          { id: 'delivery', label: '🚚 Delivery' },
          { id: 'collect', label: '🏪 Collect' },
          { id: 'zerowaste', label: '♻️ Zero-waste' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: '10px 4px', border: 'none', background: 'none',
            fontSize: 12, fontWeight: 600,
            color: tab === t.id ? '#E60000' : '#888',
            borderBottom: tab === t.id ? '2px solid #E60000' : '2px solid transparent',
            cursor: 'pointer', fontFamily: 'Inter, sans-serif'
          }}>{t.label}</button>
        ))}
      </div>

      <div className="screen screen-enter">

        {/* DELIVERY TAB */}
        {tab === 'delivery' && (
          <>
            <div style={{ background: '#1a1a1a', padding: '20px 20px 24px' }}>
              <p style={{ color: '#E60000', fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>RED ROOM WAREHOUSE</p>
              <p style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginTop: 4 }}>Neckarsulm · 1.2 km away</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 4 }}>Stock confirmed · Orders packed in 10 min</p>
              <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                <span style={{ background: '#2D7A3A', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>● Live</span>
                <span style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 11, padding: '4px 10px', borderRadius: 20 }}>3300+ Lidl warehouses</span>
              </div>
            </div>

            <div className="section-label">Choose delivery</div>
            <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '🔒', title: 'Smart Locker', sub: 'Hauptstr. 12 lobby — always available, 24/7', eta: '45 min', price: 'Free', highlight: true },
                { icon: '🏠', title: 'Home delivery', sub: 'Doorstep — choose a time slot', eta: '60 min', price: '€1.99', highlight: false },
                { icon: '📦', title: 'Click & Collect', sub: 'Pick up at Red Room warehouse', eta: '20 min', price: 'Free', highlight: false },
              ].map((opt, i) => (
                <div key={i} onClick={() => navigate('delivery')} style={{
                  background: '#fff', borderRadius: 14,
                  border: opt.highlight ? '2px solid #E60000' : '1px solid #E8E8E8',
                  padding: '14px', cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'flex-start'
                }}>
                  <span style={{ fontSize: 28 }}>{opt.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{opt.title}</p>
                      <span style={{ fontSize: 14, fontWeight: 700, color: opt.price === 'Free' ? '#2D7A3A' : '#555' }}>{opt.price}</span>
                    </div>
                    <p style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{opt.sub}</p>
                    <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                      <span className="tag tag-gray" style={{ fontSize: 11 }}>⏱ {opt.eta}</span>
                      {opt.highlight && <span className="tag tag-green" style={{ fontSize: 11 }}>Recommended</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: '14px 14px 24px' }}>
              <div style={{ background: '#EBF2FB', borderRadius: 12, padding: '12px 14px', border: '1px solid #B5D4F4' }}>
                <p style={{ fontSize: 12, color: '#185FA5', lineHeight: 1.5 }}>
                  🔒 <strong>Smart lockers</strong> outside your building mean zero failed deliveries. Pick up anytime — no waiting at home.
                </p>
              </div>
            </div>
          </>
        )}

        {/* COLLECT TAB */}
        {tab === 'collect' && (
          <>
            <div style={{ background: '#1a1a1a', padding: '20px 20px 24px' }}>
              <p style={{ color: '#F5C800', fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>CLICK & COLLECT</p>
              <p style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginTop: 4 }}>Order online. Pick up in 20 min.</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 4 }}>Walk in, show your code, walk out. No queuing.</p>
            </div>
            <div className="section-label">How it works</div>
            <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { n: '1', icon: '🛒', title: 'Add items to cart', desc: 'Browse the Lidl store and checkout as usual' },
                { n: '2', icon: '📱', title: 'Choose Click & Collect', desc: 'Select Red Room warehouse as pickup point' },
                { n: '3', icon: '⏱', title: 'Ready in 20 min', desc: 'Red Room team packs your order immediately' },
                { n: '4', icon: '🔑', title: 'Show code, pick up', desc: 'Walk to the warehouse counter, show your app code' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 14, border: '1px solid #E8E8E8', padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#E60000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{s.icon} {s.title}</p>
                    <p style={{ fontSize: 12, color: '#888', marginTop: 2, lineHeight: 1.4 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '14px 14px 24px' }}>
              <button className="btn-primary" onClick={() => navigate('store')}>🛒 Start shopping →</button>
            </div>
          </>
        )}

        {/* ZERO WASTE TAB */}
        {tab === 'zerowaste' && (
          <>
            <div style={{ background: '#1a1a1a', padding: '28px 24px', textAlign: 'center' }}>
              <span style={{ fontSize: 56 }}>♻️</span>
              <p style={{ color: '#2D7A3A', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginTop: 12 }}>ZERO-WASTE PICKUP</p>
              <p style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 4 }}>Bring your container. Pay less.</p>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>
                Already passing by the Red Room warehouse? Bring your own container and skip all plastic packaging. We weigh your items — you pay only for what you take.
              </p>
            </div>

            <div className="section-label">Why it works</div>
            <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '🧺', title: 'Bring any container', desc: 'Bag, jar, box — anything. We tare the weight before filling.' },
                { icon: '⚖️', title: 'Pay only for what you need', desc: 'No fixed pack sizes. Take exactly what your recipe needs — less waste at home.' },
                { icon: '🚫', title: 'Zero plastic packaging', desc: 'No tray, no wrap, no bag. The container goes home with you and comes back next time.' },
                { icon: '💳', title: 'Pay via Lidl Plus', desc: 'One tap at the counter. Purchase added to your fridge tracker automatically.' },
              ].map((item, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 14, border: '1px solid #E8E8E8', padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 28 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{item.title}</p>
                    <p style={{ fontSize: 12, color: '#888', marginTop: 2, lineHeight: 1.4 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: '14px 14px 0' }}>
              <div style={{ background: '#EAF5EC', borderRadius: 14, padding: '14px', border: '1px solid #B5D9BE' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', textAlign: 'center', gap: 8 }}>
                  <div>
                    <p style={{ fontSize: 20, fontWeight: 700, color: '#2D7A3A' }}>0g</p>
                    <p style={{ fontSize: 11, color: '#555' }}>Plastic used</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 20, fontWeight: 700, color: '#2D7A3A' }}>-23%</p>
                    <p style={{ fontSize: 11, color: '#555' }}>vs packaged</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 20, fontWeight: 700, color: '#2D7A3A' }}>98%</p>
                    <p style={{ fontSize: 11, color: '#555' }}>Pfand return rate</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: '14px 14px 24px' }}>
              {!collected ? (
                <button className="btn-primary" onClick={() => setCollected(true)}>
                  ✓ I brought my container — check in
                </button>
              ) : (
                <div style={{ background: '#2D7A3A', borderRadius: 14, padding: '16px', textAlign: 'center' }}>
                  <span style={{ fontSize: 36 }}>✅</span>
                  <p style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginTop: 8 }}>Checked in!</p>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 4 }}>Head to the Red Room counter. Show this screen.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <BottomNav active="redroom" />
    </>
  )
}
