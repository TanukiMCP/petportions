'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface User {
  email: string
  id: string
  user_metadata?: {
    full_name?: string
    first_name?: string
    last_name?: string
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, remember?: boolean) => Promise<{ error?: string }>
  signup: (
    email: string,
    password: string,
    options?: { remember?: boolean; metadata?: { first_name?: string; last_name?: string } }
  ) => Promise<{ error?: string }>
  logout: () => Promise<{ error?: string }>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing user session on mount
    const initAuth = () => {
      if (typeof window !== 'undefined' && window.netlifyIdentity) {
        const currentUser = window.netlifyIdentity.currentUser()
        if (currentUser) {
          setUser({
            email: currentUser.email,
            id: currentUser.id,
            user_metadata: currentUser.user_metadata
          })
        }
        
        // Set up event listeners
        window.netlifyIdentity.on('login', (user: any) => {
          setUser({
            email: user.email,
            id: user.id,
            user_metadata: user.user_metadata
          })
        })

        window.netlifyIdentity.on('logout', () => {
          setUser(null)
        })

        window.netlifyIdentity.on('error', (err: any) => {
          console.error('Netlify Identity error:', err)
        })
      }
      setIsLoading(false)
    }

    // Initialize Netlify Identity if it's available
    if (typeof window !== 'undefined') {
      if (window.netlifyIdentity) {
        initAuth()
      } else {
        // Wait for Netlify Identity to be ready
        const checkIdentity = () => {
          if (window.netlifyIdentity) {
            initAuth()
          } else {
            setTimeout(checkIdentity, 100)
          }
        }
        checkIdentity()
      }
    }
  }, [])

  const login = async (email: string, password: string, remember = true): Promise<{ error?: string }> => {
    try {
      if (!window.netlifyIdentity) {
        return { error: 'Authentication not available' }
      }

      await window.netlifyIdentity.login(email, password, remember)
      return {}
    } catch (error: any) {
      return { error: error.message || 'Login failed' }
    }
  }

  const signup = async (
    email: string,
    password: string,
    options?: { remember?: boolean; metadata?: { first_name?: string; last_name?: string } }
  ): Promise<{ error?: string }> => {
    try {
      if (!window.netlifyIdentity) {
        return { error: 'Authentication not available' }
      }

      const remember = options?.remember ?? true
      const metadata = options?.metadata

      await window.netlifyIdentity.signup(email, password, {
        ...metadata,
        full_name: metadata?.first_name && metadata?.last_name 
          ? `${metadata.first_name} ${metadata.last_name}` 
          : undefined
      })
      
      // After signup, automatically log them in
      await window.netlifyIdentity.login(email, password, remember)
      return {}
    } catch (error: any) {
      return { error: error.message || 'Signup failed' }
    }
  }

  const logout = async (): Promise<{ error?: string }> => {
    try {
      if (!window.netlifyIdentity) {
        return { error: 'Authentication not available' }
      }

      await window.netlifyIdentity.logout()
      return {}
    } catch (error: any) {
      return { error: error.message || 'Logout failed' }
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Type declarations for Netlify Identity
declare global {
  interface Window {
    netlifyIdentity?: {
      currentUser: () => any
      login: (email: string, password: string, remember?: boolean) => Promise<any>
      signup: (email: string, password: string, data?: any) => Promise<any>
      logout: () => Promise<void>
      requestPasswordRecovery: (email: string) => Promise<void>
      on: (event: 'login' | 'logout' | 'error', callback: (data: any) => void) => void
      off: (event: 'login' | 'logout' | 'error', callback: (data: any) => void) => void
      init: () => void
      open: (type: 'login' | 'signup') => void
      close: () => void
    }
  }
}
