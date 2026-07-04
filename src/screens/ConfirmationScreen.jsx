import React from 'react'

export default function ConfirmationScreen({ navigate, StatusBar, BottomNav }) {
  return (
    <>
      <StatusBar />
      <div className="screen screen-enter" style={{ padding: '0 0 24px' }}>

        {/* Success header */}
        <div style={{
          background: '#2D7A3A',
          padding: '32px 24px 28px',
          textAlign: 'center'
        }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
            margin: '0 auto 14px'
          }}>✅</div>
          <p style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Order confirmed!</p>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14 }}>Arriving at smart locker in ~45 min</p>
        </div>

        {/* Locker code */}
        <div style={{ padding: '16px 14px 0' }}>
          <div style={{
            background: '#1a1a1a',
            borderRadius: 16,
            padding: '20px',
            textAlign: 'center'
          }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600, marginBottom: 8, letterSpacing: 1 }}>
              SMART LOCKER CODE
            </p>
            <p style={{ color: '#F5C800', fontSize: 44, fontWeight: 700, letterSpacing: 12 }}>4829</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 8 }}>Hauptstr. 12 lobby · Valid 24hrs</p>
          </div>
        </div>

        {/* Magic loop stats */}
        <div style={{ padding: '14px 14px 0' }}>
          <div style={{
            background: '#F9F9F9',
            borderRadius: 14,
            padding: '16px'
          }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 12 }}>Magic loop — this week 🔄</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {[
                { value: '€23', label: 'Food saved', color: '#E60000' },
                { value: '4', label: 'MC Smart uses', color: '#2D7A3A' },
                { value: '1', label: 'Coupon earned', color: '#7A6000' },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 22, fontWeight: 700, color: stat.color }}>{stat.value}</p>
                  <p style={{ fontSize: 11, color: '#888', lineHeight: 1.3 }}>{stat.label}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12 }}>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '100%' }} />
              </div>
              <p style={{ fontSize: 12, color: '#2D7A3A', fontWeight: 600, marginTop: 6 }}>
                🎉 €5 coupon unlocked! Applied to next order.
              </p>
            </div>
          </div>
        </div>

        {/* Next: start cooking */}
        <div style={{ padding: '14px 14px 0' }}>
          <div style={{
            background: '#fff',
            borderRadius: 14,
            border: '2px solid #E60000',
            padding: '14px'
          }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 32 }}>🤖</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>Ready to cook?</p>
                <p style={{ fontSize: 12, color: '#888' }}>Start Poulet Basquaise now while you wait for delivery</p>
              </div>
            </div>
            <button className="btn-primary" onClick={() => navigate('mc-cooking')}>
              Start MC Smart — 22 min →
            </button>
          </div>
        </div>

        {/* Next alert preview */}
        <div style={{ padding: '14px 14px 0' }}>
          <div style={{
            background: '#FFF8E1',
            borderRadius: 12,
            padding: '12px 14px',
            border: '1px solid #F5C800',
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start'
          }}>
            <span style={{ fontSize: 20 }}>🔔</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#7A6000' }}>Coming up tomorrow</p>
              <p style={{ fontSize: 12, color: '#555', lineHeight: 1.4 }}>
                Greek yoghurt expires tomorrow. We'll suggest a recipe tonight at 6 PM.
              </p>
            </div>
          </div>
        </div>

        <div style={{ padding: '14px 14px 0' }}>
          <button className="btn-outline" onClick={() => navigate('home')}>
            Back to home
          </button>
        </div>
      </div>
      <BottomNav active="home" />
    </>
  )
}
