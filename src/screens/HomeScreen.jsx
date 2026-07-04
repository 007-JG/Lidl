import React from 'react'

export default function HomeScreen({ navigate, mcSynced, StatusBar, BottomNav }) {
  return (
    <>
      <StatusBar />
      <div className="screen screen-enter">
        {/* Header */}
        <div style={{ background: '#E60000', padding: '16px 16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 2 }}>Good evening,</p>
              <p style={{ color: '#fff', fontSize: 22, fontWeight: 700 }}>Liesel 👋</p>
            </div>
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => navigate('mc-sync')}>
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: 12,
                padding: '6px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}>
                <span style={{ fontSize: 16 }}>🤖</span>
                <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>
                  {mcSynced ? 'MC Synced ✓' : 'Connect MC'}
                </span>
              </div>
              {!mcSynced && <div className="notification-dot pulse" />}
            </div>
          </div>

          {/* Lidl Plus points */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 12,
            padding: '10px 14px',
            marginTop: 14,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: 600 }}>LIDL PLUS POINTS</p>
              <p style={{ color: '#F5C800', fontSize: 24, fontWeight: 700, lineHeight: 1.2 }}>1,240</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11 }}>This week saved</p>
              <p style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>€23.40</p>
            </div>
          </div>
        </div>

        {/* Magic Loop Alert */}
        <div style={{ padding: '14px 14px 0' }}>
          <div
            onClick={() => navigate('recipe-detail', { recipe: 'poulet' })}
            style={{
              background: '#fff',
              borderRadius: 16,
              border: '2px solid #E60000',
              padding: 14,
              cursor: 'pointer',
              boxShadow: '0 2px 12px rgba(230,0,0,0.12)'
            }}
          >
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: '#FFF0F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                flexShrink: 0
              }}>⚠️</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#E60000' }}>Kitchen alert</p>
                  <span className="tag tag-red">Expires today</span>
                </div>
                <p style={{ fontSize: 13, color: '#333', lineHeight: 1.4 }}>
                  Chicken breast expires today. MC Smart can make <strong>Poulet Basquaise</strong> in 22 mins.
                </p>
                <p style={{ fontSize: 12, color: '#E60000', fontWeight: 600, marginTop: 6 }}>
                  Tap to save it →
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Savings tracker */}
        <div style={{ padding: '14px 14px 0' }}>
          <div style={{ background: '#F9F9F9', borderRadius: 14, padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>Weekly coupon tracker</p>
              <span className="tag tag-green">4 of 4 ✓</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '100%' }} />
            </div>
            <p style={{ fontSize: 11, color: '#2D7A3A', fontWeight: 600, marginTop: 6 }}>🎉 €5 coupon unlocked! Use on next order.</p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="section-label">Quick actions</div>
        <div style={{ padding: '0 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { icon: '🍽️', label: 'Browse recipes', sub: '600+ MC Smart', action: () => navigate('recipes') },
            { icon: '🛒', label: 'Shop groceries', sub: 'Lidl store', action: () => navigate('store') },
            { icon: '📦', label: 'Red Room', sub: 'Zero-waste refill', action: () => navigate('redroom') },
            { icon: '🤖', label: mcSynced ? 'MC Smart ✓' : 'Connect MC Smart', sub: mcSynced ? 'Synced' : 'Setup', action: () => navigate('mc-sync') },
          ].map((item, i) => (
            <div
              key={i}
              onClick={item.action}
              style={{
                background: '#fff',
                borderRadius: 14,
                border: '1px solid #E8E8E8',
                padding: '14px 12px',
                cursor: 'pointer',
                transition: 'transform 0.1s'
              }}
            >
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#111', marginTop: 8 }}>{item.label}</p>
              <p style={{ fontSize: 11, color: '#888' }}>{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Recent items expiring */}
        <div className="section-label">Fridge tracker</div>
        <div style={{ padding: '0 14px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { name: 'Chicken breast', exp: 'Today', icon: '🍗', status: 'danger' },
            { name: 'Greek yoghurt', exp: 'Tomorrow', icon: '🥛', status: 'warning' },
            { name: 'Bell peppers', exp: 'In 3 days', icon: '🫑', status: 'ok' },
            { name: 'Milk', exp: 'In 5 days', icon: '🥛', status: 'ok' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                borderRadius: 12,
                border: `1px solid ${item.status === 'danger' ? '#FFD0D0' : item.status === 'warning' ? '#FFF3C4' : '#E8E8E8'}`,
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}
            >
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: '#111' }}>{item.name}</p>
                <p style={{ fontSize: 11, color: item.status === 'danger' ? '#E60000' : item.status === 'warning' ? '#7A6000' : '#888' }}>
                  Expires: {item.exp}
                </p>
              </div>
              {item.status === 'danger' && (
                <span className="tag tag-red" style={{ fontSize: 10 }}>Use now</span>
              )}
              {item.status === 'warning' && (
                <span className="tag tag-yellow" style={{ fontSize: 10 }}>Soon</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="home" />
    </>
  )
}
