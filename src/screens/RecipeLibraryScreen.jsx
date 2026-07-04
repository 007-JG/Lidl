import React, { useState } from 'react'

const recipes = [
  {
    id: 'poulet',
    name: 'Poulet Basquaise',
    time: '22 min',
    emoji: '🍗',
    tags: ['MC Smart', 'Expiring items'],
    desc: 'French chicken with peppers. Hands-free, one pot.',
    discount: true,
    missing: 2,
    calories: 420,
  },
  {
    id: 'soup',
    name: 'Velvety Tomato Soup',
    time: '15 min',
    emoji: '🍲',
    tags: ['MC Smart', 'Daily staple'],
    desc: 'MC Smart\'s signature — silky smooth every time.',
    discount: false,
    missing: 1,
    calories: 210,
  },
  {
    id: 'pasta',
    name: 'Creamy Mushroom Pasta',
    time: '18 min',
    emoji: '🍝',
    tags: ['MC Smart', 'Vegetarian'],
    desc: 'Rich and hearty. Everything in the machine.',
    discount: true,
    missing: 3,
    calories: 520,
  },
  {
    id: 'curry',
    name: 'Chickpea Curry',
    time: '25 min',
    emoji: '🍛',
    tags: ['MC Smart', 'Vegan', 'Discount items'],
    desc: 'Aromatic and filling. Budget-friendly tonight.',
    discount: true,
    missing: 2,
    calories: 380,
  },
  {
    id: 'risotto',
    name: 'Mushroom Risotto',
    time: '30 min',
    emoji: '🫕',
    tags: ['MC Smart', 'Weekend'],
    desc: 'Perfect risotto without stirring. MC Smart magic.',
    discount: false,
    missing: 4,
    calories: 490,
  },
  {
    id: 'steam',
    name: 'Steamed Salmon & Veg',
    time: '12 min',
    emoji: '🐟',
    tags: ['MC Smart', 'Healthy', 'Quick'],
    desc: 'Light and nutritious. Daily steam routine.',
    discount: false,
    missing: 2,
    calories: 310,
  },
]

export default function RecipeLibraryScreen({ navigate, mcSynced, StatusBar, BottomNav }) {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filters = ['all', 'quick', 'discount', 'healthy']

  const filtered = recipes.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase())
    if (filter === 'quick') return matchSearch && parseInt(r.time) <= 20
    if (filter === 'discount') return matchSearch && r.discount
    if (filter === 'healthy') return matchSearch && r.calories < 400
    return matchSearch
  })

  return (
    <>
      <StatusBar />
      <div className="nav-bar">
        <span style={{ fontSize: 20 }}>🍽️</span>
        <span className="nav-title">MC Smart Recipes</span>
        <span className="tag tag-gray">600+</span>
      </div>

      <div className="screen screen-enter">
        {/* MC Smart sync nudge */}
        {!mcSynced && (
          <div
            onClick={() => navigate('mc-sync')}
            style={{
              margin: '12px 14px 0',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)',
              borderRadius: 14,
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer'
            }}
          >
            <span style={{ fontSize: 32 }}>🤖</span>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#F5C800', fontSize: 13, fontWeight: 700 }}>Connect your MC Smart</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, lineHeight: 1.4 }}>
                One tap sends recipe to your machine. No reading steps.
              </p>
            </div>
            <span style={{ color: '#F5C800', fontSize: 20 }}>›</span>
          </div>
        )}

        {mcSynced && (
          <div style={{
            margin: '12px 14px 0',
            background: '#EAF5EC',
            borderRadius: 14,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <span style={{ fontSize: 22 }}>✅</span>
            <p style={{ fontSize: 13, color: '#2D7A3A', fontWeight: 600 }}>
              MC Smart synced — tap any recipe to start cooking
            </p>
          </div>
        )}

        {/* Search */}
        <div style={{ padding: '12px 14px 0' }}>
          <input
            type="text"
            placeholder="Search recipes..."
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

        {/* Filter chips */}
        <div style={{ padding: '10px 14px', display: 'flex', gap: 8, overflowX: 'auto' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? '#E60000' : '#F0F0F0',
                color: filter === f ? '#fff' : '#555',
                border: 'none',
                borderRadius: 20,
                padding: '6px 14px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'Inter, sans-serif',
                transition: 'background 0.15s'
              }}
            >
              {f === 'all' ? 'All recipes' : f === 'quick' ? '⚡ Quick (<20 min)' : f === 'discount' ? '🏷️ Discount items' : '🥗 Healthy'}
            </button>
          ))}
        </div>

        {/* Recipe cards */}
        <div style={{ padding: '4px 14px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(recipe => (
            <div
              key={recipe.id}
              onClick={() => navigate('recipe-detail', { recipe: recipe.id })}
              style={{
                background: '#fff',
                borderRadius: 16,
                border: recipe.discount ? '2px solid #E60000' : '1px solid #E8E8E8',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              {/* Recipe hero */}
              <div style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                padding: '18px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 14
              }}>
                <span style={{ fontSize: 44 }}>{recipe.emoji}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{recipe.name}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ background: '#F5C800', color: '#1a1a1a', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>
                      🤖 MC Smart
                    </span>
                    <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 11, padding: '2px 8px', borderRadius: 20 }}>
                      ⏱ {recipe.time}
                    </span>
                    {recipe.discount && (
                      <span style={{ background: '#E60000', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>
                        🏷️ Discount
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Recipe info */}
              <div style={{ padding: '10px 14px 12px' }}>
                <p style={{ fontSize: 13, color: '#555', lineHeight: 1.4, marginBottom: 8 }}>{recipe.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#E60000', fontWeight: 600 }}>
                    {recipe.missing} items to add to cart
                  </span>
                  <span style={{ fontSize: 12, color: '#888' }}>{recipe.calories} kcal</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="recipes" />
    </>
  )
}
