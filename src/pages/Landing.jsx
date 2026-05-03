import { useState } from 'react'
import Navbar from '../components/landing/Navbar'
import HeroSection from '../components/landing/HeroSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import StatsSection from '../components/landing/StatsSection'
import HowItWorks from '../components/landing/HowItWorks'
import VerseBanner from '../components/landing/VerseBanner'
import Footer from '../components/landing/Footer'
import AuthModal from '../components/auth/AuthModal'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'

export default function Landing() {
  const [modalType, setModalType] = useState(null) // 'login', 'register', or null

  const handleOpenLogin = () => setModalType('login')
  const handleOpenRegister = () => setModalType('register')
  const handleCloseModal = () => setModalType(null)

  return (
    <div className="bg-white min-h-screen text-gray-800 selection:bg-teal-500/20 selection:text-teal-700">
      <Navbar onOpenLogin={handleOpenLogin} onOpenRegister={handleOpenRegister} />
      
      <main>
        <HeroSection onOpenRegister={handleOpenRegister} />
        <StatsSection />
        <FeaturesSection />
        <HowItWorks />
        <VerseBanner />
      </main>

      <Footer />

      {/* Auth Modals */}
      <AuthModal isOpen={modalType !== null} onClose={handleCloseModal}>
        {modalType === 'login' ? (
          <LoginForm 
            onSwitchToRegister={handleOpenRegister} 
            onClose={handleCloseModal}
          />
        ) : modalType === 'register' ? (
          <RegisterForm 
            onSwitchToLogin={handleOpenLogin} 
            onClose={handleCloseModal}
          />
        ) : null}
      </AuthModal>
    </div>
  )
}
