import React, { useState } from 'react'

const recipeData = {
  poulet: {
    name: 'Poulet Basquaise',
    emoji: '🍗',
    time: '22 min',
    calories: 420,
    desc: 'Classic French chicken with roasted peppers and tomatoes. Hands-free — MC Smart does everything.',
    haveItems: [
      { name: 'Chicken breast', qty: '400g', note: 'Expires today' },
      { name: 'Onion', qty: '1 large', note: '' },
      { name: 'Olive oil', qty: '2 tbsp', note: '' },
    ],
    cartItems: [
      { name: 'Bell peppers (mixed)', qty: '2 pcs', price: '€0.89', discount: false },
      { name: 'Chopped tomatoes', qty: '1 tin', price: '€0.69', discount: true },
    ],
    steps: ['Add chicken and onions to MC Smart bowl', 'Pour in tomatoes and peppers', 'Select Poulet Basquaise — 22 min', 'Serve with crusty bread'],
  },
  soup: {
    name: 'Velvety Tomato Soup',
    emoji: '🍲',
    time: '15 min',
    calories: 210,
    desc: 'MC Smart\'s most loved recipe. Silky smooth every single time.',
    haveItems: [
      { name: 'Olive oil', qty: '2 tbsp', note: '' },
      { name: 'Onion', qty: '1 medium', note: '' },
    ],
    cartItems: [
      { name: 'Plum tomatoes', qty: '400g tin', price: '€0.65', discount: true },
      { name: 'Vegetable stock', qty: '500ml', price: '€1.19', discount: false },
    ],
    steps: ['Add all ingredients to MC Smart', 'Select Tomato Soup — 15 min', 'MC Smart blends automatically', 'Season and serve'],
  },
}

export default function RecipeDetailScreen({ navigate, mcSynced, selectedRecipe, StatusBar, BottomNav }) {
  const [sent, setSent] = useState(false)
  const recipe = recipeData[selectedRecipe] || recipeData['poulet']
  const totalCart = recipe.cartItems.reduce((sum, item) => {
    return sum + parseFloat(item.price.replace('€', ''))
  }, 0)

  const handleSendToMC = () => {
    setSent(true)
    setTimeout(() => navigate('mc-cooking'), 1200)
  }

  return (
    <>
      <StatusBar />
      <div className="nav-bar">
        <button className="btn-ghost" onClick={() => navigate('recipes')}>←</button>
        <span className="nav-title">{recipe.name}</span>
        <span style={{ fontSize: 22 }}>{recipe.emoji}</span>
      </div>

      <div className="screen screen-enter">
        {/* Hero */}
        <div style={{
          background: 'linear-gradient(160deg, #1a1a1a 0%, #333 100%)',
          padding: '24px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 16
        }}>
          <span style={{ fontSize: 64 }}>{recipe.emoji}</span>
          <div>
            <p style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{recipe.name}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ background: '#F5C800', color: '#1a1a1a', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>
                ⏱ {recipe.time}
              </span>
              <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 12, padding: '3px 10px', borderRadius: 20 }}>
                {recipe.calories} kcal
              </span>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 0 8px' }}>
          <p style={{ padding: '14px 16px 0', fontSize: 14, color: '#555', lineHeight: 1.5 }}>{recipe.desc}</p>

          {/* MC Smart send button / FOMO */}
          <div style={{ padding: '14px 14px 0' }}>
            {mcSynced ? (
              <button
                className="btn-primary"
                onClick={handleSendToMC}
                style={{ background: sent ? '#2D7A3A' : '#E60000' }}
              >
                {sent ? '✅ Sent to MC Smart — starting...' : '🤖 Send to MC Smart — cook now'}
              </button>
            ) : (
              <div style={{
                background: '#1a1a1a',
                borderRadius: 14,
                padding: '14px 16px',
                marginBottom: 4
              }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: 32 }}>🤖</span>
                  <div>
                    <p style={{ color: '#F5C800', fontSize: 14, fontWeight: 700 }}>With MC Smart</p>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>This recipe cooks itself in {recipe.time}. No stirring. No watching.</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('mc-sync')}
                  style={{
                    width: '100%',
                    background: '#F5C800',
                    color: '#1a1a1a',
                    border: 'none',
                    borderRadius: 10,
                    padding: '11px',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  Connect MC Smart — €449 →
                </button>
              </div>
            )}
          </div>

          {/* What you already have */}
          <div className="section-label">Already in your fridge</div>
          <div style={{ padding: '0 14px' }}>
            {recipe.haveItems.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 0',
                borderBottom: i < recipe.haveItems.length - 1 ? '1px solid #F0F0F0' : 'none'
              }}>
                <span style={{ fontSize: 20, color: '#2D7A3A' }}>✓</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#111' }}>{item.name}</p>
                  {item.note && <p style={{ fontSize: 11, color: '#E60000', fontWeight: 600 }}>{item.note}</p>}
                </div>
                <span style={{ fontSize: 12, color: '#888' }}>{item.qty}</span>
              </div>
            ))}
          </div>

          {/* Add to cart */}
          <div className="section-label">Adding to cart</div>
          <div style={{ padding: '0 14px' }}>
            {recipe.cartItems.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 0',
                borderBottom: i < recipe.cartItems.length - 1 ? '1px solid #F0F0F0' : 'none'
              }}>
                <span style={{ fontSize: 20, color: '#E60000' }}>🛒</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#111' }}>{item.name}</p>
                  <p style={{ fontSize: 12, color: '#888' }}>{item.qty}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{item.price}</p>
                  {item.discount && <span className="tag tag-red" style={{ fontSize: 10 }}>On sale</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Total + order */}
          <div style={{ padding: '14px 14px 24px' }}>
            <div style={{
              background: '#F9F9F9',
              borderRadius: 12,
              padding: '12px 14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12
            }}>
              <p style={{ fontSize: 14, color: '#555' }}>Total to order</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#E60000' }}>€{totalCart.toFixed(2)}</p>
            </div>
            <button className="btn-primary" onClick={() => navigate('delivery')}>
              Order from Red Room — deliver in 45 min →
            </button>
            <div style={{ marginTop: 8 }}>
              <button className="btn-outline" onClick={() => navigate('store')}>
                Browse full grocery store
              </button>
            </div>
          </div>

          {/* Steps (non-MC fallback) */}
          {!mcSynced && (
            <>
              <div className="section-label">Manual steps (without MC Smart)</div>
              <div style={{ padding: '0 14px 24px' }}>
                {recipe.steps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: '#F0F0F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#555',
                      flexShrink: 0
                    }}>{i + 1}</div>
                    <p style={{ fontSize: 13, color: '#333', lineHeight: 1.5, paddingTop: 4 }}>{step}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <BottomNav active="recipes" />
    </>
  )
}
