import React, { useState, useEffect } from 'react'

const steps = [
  'Heating olive oil — 2 min',
  'Sautéing chicken and onions — 5 min',
  'Adding peppers and tomatoes — 2 min',
  'Simmering on low heat — 10 min',
  'Resting — 3 min',
]

export default function MCCookingScreen({ navigate, StatusBar, BottomNav }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [totalLeft, setTotalLeft] = useState(18 * 60 + 32)

  useEffect(() => {
    const timer = setInterval(() => {
      setTotalLeft(t => Math.max(0, t - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const mins = Math.floor(totalLeft / 60)
  const secs = totalLeft % 60
  const progress = ((22 * 60 - totalLeft) / (22 * 60)) * 100

  return (
    <>
      <StatusBar />
      <div className="nav-bar">
        <span style={{ fontSize: 20 }}>🤖</span>
        <span className="nav-title">MC Smart — cooking</span>
        <span className="tag tag-green pulse">Live</span>
      </div>

      <div className="screen screen-enter">
        {/* MC display */}
        <div style={{
          background: '#1a1a1a',
          padding: '28px 24px',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: 56 }}>🍗</span>
          <p style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 12, marginBottom: 6 }}>
            Poulet Basquaise
          </p>
          <p style={{ color: '#F5C800', fontSize: 48, fontWeight: 300, lineHeight: 1 }}>
            {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 4 }}>remaining</p>
          <div style={{ margin: '16px 0 4px' }}>
            <div style={{ background: '#333', borderRadius: 6, height: 8 }}>
              <div style={{
                background: '#F5C800',
                borderRadius: 6,
                height: 8,
                width: `${Math.min(100, progress)}%`,
                transition: 'width 1s linear'
              }} />
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>
            Step {currentStep} of {steps.length} — {steps[currentStep - 1]}
          </p>
        </div>

        {/* Steps */}
        <div className="section-label">Cooking steps</div>
        <div style={{ padding: '0 14px' }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              display: 'flex',
              gap: 12,
              padding: '10px 0',
              borderBottom: i < steps.length - 1 ? '1px solid #F0F0F0' : 'none',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: i + 1 < currentStep ? '#2D7A3A' : i + 1 === currentStep ? '#E60000' : '#F0F0F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: i + 1 < currentStep ? 14 : 13,
                fontWeight: 700,
                color: i + 1 <= currentStep ? '#fff' : '#888',
                flexShrink: 0,
                transition: 'background 0.3s'
              }}>
                {i + 1 < currentStep ? '✓' : i + 1}
              </div>
              <p style={{
                fontSize: 14,
                color: i + 1 === currentStep ? '#111' : i + 1 < currentStep ? '#888' : '#ccc',
                fontWeight: i + 1 === currentStep ? 600 : 400,
                paddingTop: 4,
                lineHeight: 1.4
              }}>{step}</p>
            </div>
          ))}
        </div>

        {/* Skip step (for demo) */}
        {currentStep < steps.length && (
          <div style={{ padding: '12px 14px 0' }}>
            <button
              onClick={() => setCurrentStep(s => Math.min(steps.length, s + 1))}
              className="btn-outline"
            >
              Next step →
            </button>
          </div>
        )}

        {/* Magic loop this week */}
        <div style={{ padding: '14px 14px 0' }}>
          <div style={{
            background: '#F9F9F9',
            borderRadius: 14,
            padding: '14px'
          }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 10 }}>Magic loop — this week 🔄</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, textAlign: 'center' }}>
              <div>
                <p style={{ fontSize: 20, fontWeight: 700, color: '#E60000' }}>€23</p>
                <p style={{ fontSize: 11, color: '#888' }}>Food saved</p>
              </div>
              <div>
                <p style={{ fontSize: 20, fontWeight: 700, color: '#2D7A3A' }}>4</p>
                <p style={{ fontSize: 11, color: '#888' }}>MC uses</p>
              </div>
              <div>
                <p style={{ fontSize: 20, fontWeight: 700, color: '#7A6000' }}>1</p>
                <p style={{ fontSize: 11, color: '#888' }}>Coupon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next expiry preview */}
        <div style={{ padding: '14px 14px 24px' }}>
          <div style={{
            background: '#FFF0F0',
            borderRadius: 12,
            padding: '12px 14px',
            border: '1px solid #FFD0D0',
            display: 'flex',
            gap: 10,
            alignItems: 'center'
          }}>
            <span style={{ fontSize: 20 }}>🔔</span>
            <p style={{ fontSize: 12, color: '#555', lineHeight: 1.4 }}>
              <strong style={{ color: '#E60000' }}>Tomorrow:</strong> Greek yoghurt expires. We'll suggest a recipe at 6 PM.
            </p>
          </div>
        </div>
      </div>
      <BottomNav active="recipes" />
    </>
  )
}
