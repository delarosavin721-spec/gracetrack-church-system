import { createDefaultAdmin } from './auth'
import { getDefaultAdminStatus } from './firestore'

const DEFAULT_ADMIN_SETUP_KEY = 'churchsystem_default_admin_initialized'

/**
 * Initialize default admin account on first app load
 * This runs only once per browser (stored in localStorage)
 */
export const initializeDefaultAdminOnce = async () => {
  try {
    // Check if we've already attempted initialization in this browser
    const isInitialized = localStorage.getItem(DEFAULT_ADMIN_SETUP_KEY)
    
    if (isInitialized) {
      console.log('Default admin already initialized in this browser')
      return { already_initialized: true }
    }

    // Check if default admin exists in database
    const adminExists = await getDefaultAdminStatus()
    
    if (adminExists) {
      localStorage.setItem(DEFAULT_ADMIN_SETUP_KEY, 'true')
      return { success: true, created: false, message: 'Default admin already exists' }
    }

    // Create the default admin
    const result = await createDefaultAdmin()
    
    if (result.success) {
      localStorage.setItem(DEFAULT_ADMIN_SETUP_KEY, 'true')
      
      // Store credentials in sessionStorage for display (user should change password after login)
      sessionStorage.setItem('defaultAdminEmail', result.email)
      sessionStorage.setItem('defaultAdminPassword', result.password)
      
      console.log('✅ Default Admin Account Created')
      console.log('📧 Email:', result.email)
      console.log('🔑 Password:', result.password)
      console.log('⚠️  IMPORTANT: Change this password after first login!')
      
      return {
        success: true,
        created: true,
        email: result.email,
        password: result.password
      }
    } else {
      localStorage.setItem(DEFAULT_ADMIN_SETUP_KEY, 'true')
      return result
    }
  } catch (error) {
    console.error('Error initializing default admin:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Get default admin credentials from session (if they were just created)
 */
export const getDefaultAdminCredentials = () => {
  const email = sessionStorage.getItem('defaultAdminEmail')
  const password = sessionStorage.getItem('defaultAdminPassword')
  
  if (email && password) {
    return { email, password }
  }
  return null
}

/**
 * Clear default admin credentials from session (after user acknowledges them)
 */
export const clearDefaultAdminCredentials = () => {
  sessionStorage.removeItem('defaultAdminEmail')
  sessionStorage.removeItem('defaultAdminPassword')
}

/**
 * Reset the initialization flag (for testing/re-initialization)
 * Only use in development or with proper authorization
 */
export const resetDefaultAdminFlag = () => {
  if (process.env.NODE_ENV === 'development') {
    localStorage.removeItem(DEFAULT_ADMIN_SETUP_KEY)
    return true
  }
  return false
}

/**
 * Force manual setup of default admin (for troubleshooting)
 * Can be called from browser console: window.setupDefaultAdminManually()
 */
export const setupDefaultAdminManually = async () => {
  try {
    console.log('🔧 Starting manual default admin setup...')
    
    // Reset the initialization flag to allow re-setup
    localStorage.removeItem(DEFAULT_ADMIN_SETUP_KEY)
    
    // Create the default admin
    const result = await initializeDefaultAdminOnce()
    
    if (result.success && result.created) {
      console.log('✅ Default Admin Account Created Successfully!')
      console.log('📧 Email:', result.email)
      console.log('🔑 Password:', result.password)
      alert(`✅ Admin account created!\n\nEmail: ${result.email}\nPassword: ${result.password}\n\n⚠️ Change password after first login!`)
      window.location.reload()
      return result
    } else {
      console.warn('⚠️ Admin account may already exist or setup was skipped')
      alert('Admin account already exists or setup skipped.')
      return result
    }
  } catch (error) {
    console.error('❌ Error during manual setup:', error)
    alert(`❌ Error: ${error.message}`)
    return { success: false, error: error.message }
  }
}

// Make manual setup available from browser console
if (typeof window !== 'undefined') {
  window.setupDefaultAdminManually = setupDefaultAdminManually
}

