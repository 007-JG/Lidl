import React, { useState } from 'react'

export default function MCSyncScreen({ navigate, mcSynced, setMcSynced, StatusBar, BottomNav }) {
  const [syncing, setSyncing] = useState(false)
  const [done, setDone] = useState(mcSynced)

  const handleSync = () => {
    setSyncing(true)
    setTimeout(() => {
      setSyncing(false)
      setDone(true)
      setMcSynced(true)
    }, 2000)
  }

  return (
    <>
      <StatusBar />
      <div className="nav-bar">
        <button className="btn-ghost" onClick={() => navigate('home')}>←</button>
        <span className="nav-title">MC Smart Setup</span>
      </div>

      <div className="screen screen-enter">
        {/* Hero */}
        <div style={{
          background: '#1a1a1a',
          padding: '32px 24px',
          textAlign: 'center'
        }}>
          <div style={{
            width: 100,
            height: 100,
            borderRadius: 24,
            background: done ? '#2D7A3A' : '#F5C800',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 52,
            margin: '0 auto 16px'
          }}>
            {done ? '✅' : '🤖'}
          </div>
          <p style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
            {done ? 'MC Smart connected!' : 'Monsieur Cuisine Smart'}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.5 }}>
            {done
              ? 'Your machine is synced. Tap any recipe to start cooking hands-free.'
              : 'Connect your machine to Lidl Plus. Recipes go straight to your touchscreen.'}
          </p>
        </div>

        {!done && (
          <>
            {/* Why connect */}
            <div className="section-label">What you unlock</div>
            <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '📲', title: 'One-tap cooking', desc: 'Recipe sends to MC Smart automatically. No steps to read.' },
                { icon: '⚠️', title: 'Expiry alerts', desc: 'App detects what\'s about to expire and suggests the perfect recipe.' },
                { icon: '🏷️', title: 'Smart discounts', desc: 'Recipes surface items on discount. Save money automatically.' },
                { icon: '🔄', title: 'Magic loop', desc: 'Cook → save food → earn coupons → cook again. Lidl rewards you.' },
              ].map((item, i) => (
                <div key={i} style={{
                  background: '#fff',
                  borderRadius: 14,
                  border: '1px solid #E8E8E8',
                  padding: '12px 14px',
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start'
                }}>
                  <span style={{ fontSize: 24 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#111', marginBottom: 2 }}>{item.title}</p>
                    <p style={{ fontSize: 13, color: '#666', lineHeight: 1.4 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Spec comparison */}
            <div className="section-label">Why MC Smart?</div>
            <div style={{ padding: '0 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              {[
                { brand: 'Thermomix TM6', price: '€1,549', rank: '3x more expensive', lidl: false },
                { brand: 'MC Smart', price: '€449', rank: 'Same core functions', lidl: true },
              ].map((item, i) => (
                <div key={i} style={{
                  background: item.lidl ? '#1a1a1a' : '#F9F9F9',
                  borderRadius: 14,
                  border: item.lidl ? '2px solid #F5C800' : '1px solid #E8E8E8',
                  padding: '14px 12px',
                  textAlign: 'center'
                }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: item.lidl ? '#F5C800' : '#888', marginBottom: 6 }}>
                    {item.lidl ? 'LIDL ✓' : 'COMPETITOR'}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: item.lidl ? '#fff' : '#111', marginBottom: 4 }}>{item.brand}</p>
                  <p style={{ fontSize: 22, fontWeight: 700, color: item.lidl ? '#F5C800' : '#333' }}>{item.price}</p>
                  <p style={{ fontSize: 11, color: item.lidl ? 'rgba(255,255,255,0.6)' : '#888', marginTop: 4 }}>
                    {item.rank}
                  </p>
                </div>
              ))}
            </div>

            {/* Connect steps */}
            <div className="section-label">How to connect</div>
            <div style={{ padding: '0 14px 24px' }}>
              {[
                'Switch on your MC Smart',
                'Go to Settings → Lidl Plus on the touchscreen',
                'Tap the button below to generate pairing code',
                'Enter the code on your machine'
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: '#E60000',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 700,
                    flexShrink: 0
                  }}>{i + 1}</div>
                  <p style={{ fontSize: 13, color: '#333', lineHeight: 1.5, paddingTop: 4 }}>{step}</p>
                </div>
              ))}
              <button
                className="btn-primary"
                onClick={handleSync}
                style={{ marginTop: 8, background: syncing ? '#888' : '#E60000' }}
                disabled={syncing}
              >
                {syncing ? '🔄 Connecting...' : '🤖 Pair MC Smart now'}
              </button>
              <div style={{ marginTop: 10 }}>
                <button
                  className="btn-outline"
                  onClick={() => window.open('https://lidl.de', '_blank')}
                >
                  Don't have MC Smart? View on Lidl.de →
                </button>
              </div>
            </div>
          </>
        )}

        {done && (
          <div style={{ padding: '24px 14px' }}>
            <div style={{
              background: '#EAF5EC',
              borderRadius: 16,
              padding: '20px',
              textAlign: 'center',
              marginBottom: 16
            }}>
              <span style={{ fontSize: 48 }}>🎉</span>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#2D7A3A', marginTop: 12 }}>You're all set!</p>
              <p style={{ fontSize: 14, color: '#555', marginTop: 6, lineHeight: 1.5 }}>
                MC Smart is connected. Open any recipe and tap "Send to MC Smart" to start hands-free cooking.
              </p>
            </div>
            <button className="btn-primary" onClick={() => navigate('recipes')}>
              Browse recipes →
            </button>
            <div style={{ marginTop: 10 }}>
              <button className="btn-outline" onClick={() => navigate('home')}>
                Back to home
              </button>
            </div>
          </div>
        )}
      </div>
      <BottomNav active="home" />
    </>
  )
}
