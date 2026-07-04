import React, { useState } from 'react'
import './styles.css'
import HomeScreen from './screens/HomeScreen.jsx'
import RecipeLibraryScreen from './screens/RecipeLibraryScreen.jsx'
import RecipeDetailScreen from './screens/RecipeDetailScreen.jsx'
import DeliveryScreen from './screens/DeliveryScreen.jsx'
import ConfirmationScreen from './screens/ConfirmationScreen.jsx'
import MCSyncScreen from './screens/MCSyncScreen.jsx'
import GroceryStoreScreen from './screens/GroceryStoreScreen.jsx'
import MCCookingScreen from './screens/MCCookingScreen.jsx'
import OffersScreen from './screens/OffersScreen.jsx'
import RedRoomScreen from './screens/RedRoomScreen.jsx'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [mcSynced, setMcSynced] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [activeTab, setActiveTab] = useState('home')

  const navigate = (to, params = {}) => {
    if (params.recipe) setSelectedRecipe(params.recipe)
    setScreen(to)
  }

  const goTab = (tab) => {
    setActiveTab(tab)
    if (tab === 'home') setScreen('home')
    if (tab === 'recipes') setScreen('recipes')
    if (tab === 'store') setScreen('store')
    if (tab === 'offers') setScreen('offers')
    if (tab === 'redroom') setScreen('redroom')
  }

  const BottomNav = ({ active }) => (
    <div className="bottom-nav">
      {[
        { id: 'home', icon: '🏠', label: 'Home' },
        { id: 'recipes', icon: '🍽️', label: 'Recipes' },
        { id: 'store', icon: '🛒', label: 'Shop' },
        { id: 'offers', icon: '🏷️', label: 'Offers' },
      ].map(item => (
        <div
          key={item.id}
          className={`bnav-item ${active === item.id ? 'active' : ''}`}
          onClick={() => goTab(item.id)}
        >
          <span className="bnav-icon">{item.icon}</span>
          <span className="bnav-label">{item.label}</span>
        </div>
      ))}
    </div>
  )

  const StatusBar = () => (
    <div className="status-bar">
      <span>9:41</span>
      <span style={{ color: '#E60000', fontWeight: 700 }}>Lidl Plus</span>
      <span>●●● 100%</span>
    </div>
  )

  const screenProps = { navigate, mcSynced, setMcSynced, selectedRecipe, BottomNav, StatusBar }

  return (
    <div className="phone-shell">
      <div className="phone">
        {screen === 'home' && <HomeScreen {...screenProps} />}
        {screen === 'recipes' && <RecipeLibraryScreen {...screenProps} />}
        {screen === 'recipe-detail' && <RecipeDetailScreen {...screenProps} />}
        {screen === 'delivery' && <DeliveryScreen {...screenProps} />}
        {screen === 'confirmation' && <ConfirmationScreen {...screenProps} />}
        {screen === 'mc-sync' && <MCSyncScreen {...screenProps} />}
        {screen === 'store' && <GroceryStoreScreen {...screenProps} />}
        {screen === 'mc-cooking' && <MCCookingScreen {...screenProps} />}
        {screen === 'offers' && <OffersScreen {...screenProps} />}
        {screen === 'redroom' && <RedRoomScreen {...screenProps} />}
      </div>
    </div>
  )
}
