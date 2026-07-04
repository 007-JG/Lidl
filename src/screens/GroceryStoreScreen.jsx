import React, { useState } from 'react'

const categories = [
  { id: 'all', label: 'All', icon: '🛒' },
  { id: 'veg', label: 'Veg & Fruit', icon: '🥦' },
  { id: 'meat', label: 'Meat', icon: '🍗' },
  { id: 'dairy', label: 'Dairy', icon: '🥛' },
  { id: 'pantry', label: 'Pantry', icon: '🥫' },
  { id: 'snacks', label: 'Snacks', icon: '🍪' },
]

const products = [
  { id: 1, name: 'Bell Peppers Mixed', price: 0.89, orig: null, cat: 'veg', emoji: '🫑', unit: '3 pcs', discount: false, recipe: true, pkg: 'Recyclable tray' },
  { id: 2, name: 'Chopped Tomatoes', price: 0.69, orig: 0.99, cat: 'pantry', emoji: '🥫', unit: '400g tin', discount: true, recipe: true, pkg: 'Recyclable tin' },
  { id: 3, name: 'Chicken Breast', price: 3.49, orig: 4.29, cat: 'meat', emoji: '🍗', unit: '500g', discount: true, recipe: false, pkg: 'Plastic tray' },
  { id: 4, name: 'Greek Yoghurt', price: 1.19, orig: null, cat: 'dairy', emoji: '🥛', unit: '500g', discount: false, recipe: false, pkg: 'Recyclable pot' },
  { id: 5, name: 'Whole Milk', price: 0.99, orig: null, cat: 'dairy', emoji: '🥛', unit: '1L', discount: false, recipe: false, pkg: 'Recyclable carton' },
  { id: 6, name: 'Onions', price: 0.59, orig: null, cat: 'veg', emoji: '🧅', unit: '1kg bag', discount: false, recipe: false, pkg: 'Bulk at Red Room ✓' },
  { id: 7, name: 'Pasta Penne', price: 0.79, orig: 1.09, cat: 'pantry', emoji: '🍝', unit: '500g', discount: true, recipe: false, pkg: 'Bulk at Red Room ✓' },
  { id: 8, name: 'Olive Oil', price: 3.99, orig: null, cat: 'pantry', emoji: '🫒', unit: '500ml', discount: false, recipe: false, pkg: 'Refill at Red Room ✓' },
  { id: 9, name: 'Mushrooms', price: 1.29, orig: null, cat: 'veg', emoji: '🍄', unit: '250g', discount: false, recipe: false, pkg: 'Plastic-free ✓' },
  { id: 10, name: 'Butter', price: 1.59, orig: 1.99, cat: 'dairy', emoji: '🧈', unit: '250g', discount: true, recipe: false, pkg: 'Recyclable wrap' },
  { id: 11, name: 'Chickpeas', price: 0.55, orig: null, cat: 'pantry', emoji: '🫘', unit: '400g tin', discount: false, recipe: false, pkg: 'Bulk at Red Room ✓' },
  { id: 12, name: 'Salmon Fillet', price: 4.99, orig: 5.99, cat: 'meat', emoji: '🐟', unit: '300g', discount: true, recipe: false, pkg: 'Recyclable tray' },
]

export default function GroceryStoreScreen({ navigate, StatusBar, BottomNav }) {
  const [cat, setCat] = useState('all')
  const [cart, setCart] = useState({ 1: 1, 2: 1 })
  const [search, setSearch] = useState('')

  const filtered = products.filter(p => {
    const matchCat = cat === 'all' || p.cat === cat
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const addToCart = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }))
  const removeFromCart = (id) => setCart(c => {
    const updated = { ...c }
    if (updated[id] > 1) updated[id]--
    else delete updated[id]
    return updated
  })

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0)
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find(p => p.id === parseInt(id))
    return sum + (p ? p.price * qty : 0)
  }, 0)

  return (
    <>
      <StatusBar />
      <div className="nav-bar">
        <span style={{ fontSize: 20 }}>🛒</span>
        <span className="nav-title">Lidl Store</span>
        <div style={{ position: 'relative' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#E60000' }}>
            {totalItems > 0 ? `${totalItems} items` : ''}
          </span>
        </div>
      </div>

      <div className="screen screen-enter">
        {/* Red Room banner */}
        <div style={{
          margin: '12px 14px 0',
          background: 'linear-gradient(135deg, #E60000 0%, #B30000 100%)',
          borderRadius: 14,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <span style={{ fontSize: 32 }}>📦</span>
          <div style={{ flex: 1 }}>
            <p style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>Red Room — 45 min delivery</p>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>From Neckarsulm warehouse · Smart locker available</p>
          </div>
          <span style={{ color: '#F5C800', fontSize: 12, fontWeight: 700 }}>FREE</span>
        </div>

        {/* Search */}
        <div style={{ padding: '12px 14px 0' }}>
          <input
            type="text"
            placeholder="Search groceries..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '11px 14px',
              borderRadius: 12,
              border: '1px solid #E0E0E0',
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              outline: 'none',
              background: '#F9F9F9',
              color: '#111'
            }}
          />
        </div>

        {/* Category chips */}
        <div style={{ padding: '10px 14px', display: 'flex', gap: 8, overflowX: 'auto' }}>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              style={{
                background: cat === c.id ? '#E60000' : '#F0F0F0',
                color: cat === c.id ? '#fff' : '#555',
                border: 'none',
                borderRadius: 20,
                padding: '6px 14px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'Inter, sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: 5
              }}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        {/* Recipe items highlight */}
        {cat === 'all' && (
          <div style={{ padding: '0 14px 0' }}>
            <div style={{
              background: '#FFF8E1',
              borderRadius: 12,
              padding: '10px 14px',
              border: '1px solid #F5C800',
              marginBottom: 4
            }}>
              <p style={{ fontSize: 12, color: '#7A6000', fontWeight: 600 }}>
                🍽️ Items highlighted in red are needed for your Poulet Basquaise recipe
              </p>
            </div>
          </div>
        )}

        {/* Product grid */}
        <div style={{ padding: '8px 14px 100px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {filtered.map(p => (
            <div
              key={p.id}
              style={{
                background: '#fff',
                borderRadius: 14,
                border: p.recipe ? '2px solid #E60000' : '1px solid #E8E8E8',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: 6
              }}
            >
              {p.recipe && (
                <span style={{ fontSize: 10, fontWeight: 700, color: '#E60000' }}>IN YOUR RECIPE</span>
              )}
              <span style={{ fontSize: 36, textAlign: 'center' }}>{p.emoji}</span>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#111', lineHeight: 1.3 }}>{p.name}</p>
              <p style={{ fontSize: 11, color: '#888' }}>{p.unit}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#E60000' }}>€{p.price.toFixed(2)}</span>
                {p.orig && <span style={{ fontSize: 12, color: '#aaa', textDecoration: 'line-through' }}>€{p.orig.toFixed(2)}</span>}
              </div>
              <p style={{ fontSize: 10, color: p.pkg.includes('Red Room') ? '#2D7A3A' : '#888', fontWeight: p.pkg.includes('Red Room') ? 600 : 400 }}>{p.pkg}</p>
              {!cart[p.id] ? (
                <button
                  onClick={() => addToCart(p.id)}
                  style={{
                    background: '#E60000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px',
                    fontSize: 18,
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >+</button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button onClick={() => removeFromCart(p.id)} style={{ background: '#F0F0F0', border: 'none', borderRadius: 8, width: 32, height: 32, fontSize: 18, cursor: 'pointer' }}>−</button>
                  <span style={{ fontWeight: 700, color: '#111' }}>{cart[p.id]}</span>
                  <button onClick={() => addToCart(p.id)} style={{ background: '#E60000', color: '#fff', border: 'none', borderRadius: 8, width: 32, height: 32, fontSize: 18, cursor: 'pointer' }}>+</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sticky cart bar */}
      {totalItems > 0 && (
        <div style={{ padding: '10px 14px 0', background: '#fff', borderTop: '1px solid #E8E8E8', flexShrink: 0 }}>
          <button className="btn-primary" onClick={() => navigate('delivery')} style={{ marginBottom: 2 }}>
            🛒 Checkout {totalItems} items — €{totalPrice.toFixed(2)} →
          </button>
        </div>
      )}

      <BottomNav active="store" />
    </>
  )
}
