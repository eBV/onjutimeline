import React, { createContext, useContext, useState } from 'react'
import { createThirdwebClient, defineChain } from 'thirdweb'
import { ethereum } from 'thirdweb/chains'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

import { CONTRACT_ADDRESS } from '../lib/constants'

// Constants
const CLIENT_ID = import.meta.env.VITE_THIRDWEB_CLIENT_ID || '09797204fc3d09a0636257d079ebcb80'

// Types
interface StoreContextType {
  client: ReturnType<typeof createThirdwebClient>
  chain: ReturnType<typeof defineChain>
  totalSupply: number
  currentSlide: number
  isGalleryOpen: boolean
  setCurrentSlide: (index: number) => void
  setIsGalleryOpen: (open: boolean) => void
  setTotalSupply: (supply: number) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

// Thirdweb Client
const client = createThirdwebClient({ clientId: CLIENT_ID })
const chain = defineChain(ethereum)

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

const fetchTotalSupply = async (): Promise<number> => {
  const response = await fetch('https://ethereum-rpc.publicnode.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_call',
      params: [{
        to: CONTRACT_ADDRESS,
        data: '0x18160ddd' // totalSupply() selector
      }, 'latest'],
      id: 1
    })
  })
  const data = await response.json()
  if (data.result && data.result !== '0x') {
    const supply = parseInt(data.result, 16)
    return supply > 0 ? supply : 1000
  }
  throw new Error('Failed to fetch total supply')
}

const StoreInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [manualTotalSupply, setManualTotalSupply] = useState<number | null>(null)

  const { data: queriedTotalSupply } = useQuery({
    queryKey: ['totalSupply'],
    queryFn: fetchTotalSupply,
    initialData: 1000,
  })

  const totalSupply = manualTotalSupply ?? queriedTotalSupply

  const value = {
    client,
    chain,
    totalSupply,
    currentSlide,
    isGalleryOpen,
    setCurrentSlide,
    setIsGalleryOpen,
    setTotalSupply: setManualTotalSupply
  }

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  )
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreInner>{children}</StoreInner>
    </QueryClientProvider>
  )
}

export const useStore = () => {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
