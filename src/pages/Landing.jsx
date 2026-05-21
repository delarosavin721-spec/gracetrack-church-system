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
import AdminSetupTroubleshoot from '../components/auth/AdminSetupTroubleshoot'

export default function Landing() {
  const [modalType, setModalType] = useState(null)

  const handleOpenLogin = () => setModalType('login')
  const handleOpenRegister = () => setModalType('register')
  const handleCloseModal = () => setModalType(null)

  return (
    <div className="landing-page min-h-screen text-slate-800 selection:bg-teal-500/25 selection:text-teal-800 overflow-x-hidden">
      <Navbar onOpenLogin={handleOpenLogin} onOpenRegister={handleOpenRegister} />

      <main>
        <HeroSection onOpenRegister={handleOpenRegister} onOpenLogin={handleOpenLogin} />
        <div className="landing-section-light">
          <StatsSection />
        </div>
        <FeaturesSection />
        <div className="landing-section-light">
          <HowItWorks onOpenRegister={handleOpenRegister} />
        </div>
        <VerseBanner />
      </main>

      <Footer />

      {/* Show troubleshooting widget when login modal is open */}
      {modalType === 'login' && <AdminSetupTroubleshoot />}

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
