"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AppContextType {
  currentPdf: string | null
  setCurrentPdf: (pdf: string | null) => void
  dbStatus: boolean
  setDbStatus: (status: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentPdf, setCurrentPdf] = useState<string | null>(null)
  const [dbStatus, setDbStatus] = useState<boolean>(false)

  // Check DB status on mount
  useEffect(() => {
    const checkInitialStatus = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/db_status")
        const data = await response.json()
        setDbStatus(data.status || false)
      } catch (error) {
        console.error("Error checking initial DB status:", error)
        setDbStatus(false)
      }
    }

    checkInitialStatus()
  }, [])

  const value = {
    currentPdf,
    setCurrentPdf,
    dbStatus,
    setDbStatus,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
