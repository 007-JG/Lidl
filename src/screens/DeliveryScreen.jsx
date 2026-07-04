import React, { useState } from 'react'

export default function DeliveryScreen({ navigate, StatusBar, BottomNav }) {
  const [selected, setSelected] = useState('locker')

  const options = [
    {
      id: 'locker',
      icon: '🔒',
      title: 'Smart Locker',
      sub: 'Hauptstr. 12 lobby — always available',
      eta: '45 min',
      price: 'Free',
      priceColor: '#2D7A3A',
      highlight: true,
    },
    {
      id: 'home',
      icon: '🏠',
      title: 'Home delivery',
      sub: 'Doorstep — select a time slot',
      eta: '6:45–7:15 PM',
      price: '€1.99',
      priceColor: '#555',
      highlight: false,
    },
    {
      id: 'pickup',
      icon: '🏪',
      title: 'Store pickup',
      sub: 'Lidl Neckarsulm — ready in 30 min',
      eta: '30 min',
      price: 'Free',
      priceColor: '#2D7A3A',
      highlight: false,
    },
  ]

  return (
    <>
      <StatusBar />
      <div className="nav-bar">
        <button className="btn-ghost" onClick={() => navigate('recipe-detail')}>←</button>
        <span className="nav-title">Choose delivery</span>
      </div>

      <div className="screen screen-enter">
        {/* Red Room info */}
        <div style={{
          margin: '14px 14px 0',
          background: '#1a1a1a',
          borderRadius: 14,
          padding: '14px 16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 24 }}>📦</span>
            <div>
              <p style={{ color: '#F5C800', fontSize: 13, fontWeight: 700 }}>Red Room — active</p>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12 }}>Neckarsulm warehouse · 1.2 km away · Stock confirmed</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {['Bell peppers ✓', 'Chopped tomatoes ✓'].map((item, i) => (
              <span key={i} style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.8)',
                fontSize: 11,
                padding: '3px 10px',
                borderRadius: 20,
                fontWeight: 500
              }}>{item}</span>
            ))}
          </div>
        </div>

        {/* Delivery options */}
        <div className="section-label">Delivery options</div>
        <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {options.map(opt => (
            <div
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              style={{
                background: '#fff',
                borderRadius: 14,
                border: selected === opt.id ? '2px solid #E60000' : '1px solid #E8E8E8',
                padding: '14px',
                cursor: 'pointer',
                transition: 'border 0.15s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ fontSize: 28 }}>{opt.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: 15, fontWeight: 600, color: '#111' }}>{opt.title}</p>
                    <span style={{ fontSize: 15, fontWeight: 700, color: opt.priceColor }}>{opt.price}</span>
                  </div>
                  <p style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{opt.sub}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                    <span className="tag tag-gray" style={{ fontSize: 11 }}>⏱ {opt.eta}</span>
                    {opt.highlight && <span className="tag tag-green" style={{ fontSize: 11 }}>Recommended</span>}
                  </div>
                </div>
                <div style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  border: selected === opt.id ? '6px solid #E60000' : '2px solid #ddd',
                  flexShrink: 0,
                  marginTop: 2,
                  transition: 'border 0.15s'
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Smart locker explainer */}
        {selected === 'locker' && (
          <div style={{ padding: '12px 14px 0' }}>
            <div style={{
              background: '#EBF2FB',
              borderRadius: 12,
              padding: '12px 14px',
              border: '1px solid #B5D4F4'
            }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#185FA5', marginBottom: 4 }}>
                🔒 How smart lockers work
              </p>
              <p style={{ fontSize: 12, color: '#333', lineHeight: 1.5 }}>
                Order placed → Red Room packs your items → delivered to the locker outside your building.
                You get a 4-digit code in this app. Open anytime — 24/7.
                No failed deliveries. No waiting at home.
              </p>
            </div>
          </div>
        )}

        {/* Order summary */}
        <div className="section-label">Order summary</div>
        <div style={{ padding: '0 14px' }}>
          {[
            { label: 'Bell peppers (mixed)', price: '€0.89' },
            { label: 'Chopped tomatoes', price: '€0.69' },
            { label: 'Delivery', price: selected === 'home' ? '€1.99' : 'Free' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom: '1px solid #F0F0F0'
            }}>
              <span style={{ fontSize: 13, color: '#555' }}>{item.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: item.price === 'Free' ? '#2D7A3A' : '#111' }}>{item.price}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>Total</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#E60000' }}>
              {selected === 'home' ? '€3.57' : '€1.58'}
            </span>
          </div>
        </div>

        <div style={{ padding: '8px 14px 24px' }}>
          <button className="btn-primary" onClick={() => navigate('confirmation')}>
            Confirm order →
          </button>
        </div>
      </div>
      <BottomNav active="store" />
    </>
  )
}
