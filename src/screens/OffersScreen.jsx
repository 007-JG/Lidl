import React from 'react'

const deals = [
  { emoji: '🍗', name: 'Chicken Breast', orig: '€4.29', price: '€3.49', save: '€0.80', cat: 'Meat', expiry: '2 days left' },
  { emoji: '🥫', name: 'Chopped Tomatoes', orig: '€0.99', price: '€0.69', save: '€0.30', cat: 'Pantry', expiry: '3 days left' },
  { emoji: '🐟', name: 'Salmon Fillet', orig: '€5.99', price: '€4.99', save: '€1.00', cat: 'Meat', expiry: '1 day left' },
  { emoji: '🧈', name: 'Butter 250g', orig: '€1.99', price: '€1.59', save: '€0.40', cat: 'Dairy', expiry: '4 days left' },
  { emoji: '🍝', name: 'Pasta Penne 500g', orig: '€1.09', price: '€0.79', save: '€0.30', cat: 'Pantry', expiry: '5 days left' },
  { emoji: '🫘', name: 'Chickpeas tin', orig: '€0.89', price: '€0.55', save: '€0.34', cat: 'Pantry', expiry: '3 days left' },
]

const recipes = [
  { emoji: '🍗', name: 'Poulet Basquaise', time: '22 min', items: 'Uses chicken + tomatoes on discount' },
  { emoji: '🐟', name: 'Steamed Salmon & Veg', time: '12 min', items: 'Uses salmon — 1 day left!' },
  { emoji: '🍛', name: 'Chickpea Curry', time: '25 min', items: 'Uses chickpeas on discount' },
]

export default function OffersScreen({ navigate, StatusBar, BottomNav }) {
  return (
    <>
      <StatusBar />
      <div className="nav-bar">
        <span style={{ fontSize: 20 }}>🏷️</span>
        <span className="nav-title">This Week's Deals</span>
        <span className="tag tag-red">Live</span>
      </div>

      <div className="screen screen-enter">
        {/* Margin optimization banner */}
        <div style={{
          margin: '12px 14px 0',
          background: 'linear-gradient(135deg, #E60000 0%, #B30000 100%)',
          borderRadius: 14,
          padding: '14px 16px'
        }}>
          <p style={{ color: '#F5C800', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>LIDL SMART SAVINGS</p>
          <p style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
            Recipes built around today's discounts
          </p>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, lineHeight: 1.4 }}>
            App prioritizes discounted & slow-moving inventory in recipe suggestions — you save money, Lidl reduces waste.
          </p>
        </div>

        {/* Recipe suggestions from deals */}
        <div className="section-label">Recipes using discount items</div>
        <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {recipes.map((r, i) => (
            <div
              key={i}
              onClick={() => navigate('recipe-detail', { recipe: 'poulet' })}
              style={{
                background: '#fff',
                borderRadius: 14,
                border: '1.5px solid #E60000',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: 36 }}>{r.emoji}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{r.name}</p>
                <p style={{ fontSize: 12, color: '#888' }}>{r.items}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="tag tag-gray" style={{ fontSize: 11 }}>⏱ {r.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly deals */}
        <div className="section-label">Weekly discounts</div>
        <div style={{ padding: '0 14px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {deals.map((item, i) => (
            <div key={i} style={{
              background: '#fff',
              borderRadius: 14,
              border: '1px solid #E8E8E8',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4
            }}>
              <span style={{ fontSize: 32 }}>{item.emoji}</span>
              <span className="tag tag-gray" style={{ fontSize: 10, alignSelf: 'flex-start' }}>{item.cat}</span>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#111', lineHeight: 1.3 }}>{item.name}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#E60000' }}>{item.price}</span>
                <span style={{ fontSize: 12, color: '#aaa', textDecoration: 'line-through' }}>{item.orig}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                <span className="tag tag-green" style={{ fontSize: 10 }}>Save {item.save}</span>
                <span style={{ fontSize: 10, color: '#E60000', fontWeight: 600 }}>{item.expiry}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="offers" />
    </>
  )
}
