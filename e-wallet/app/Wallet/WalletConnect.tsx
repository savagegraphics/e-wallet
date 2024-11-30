'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, AlertCircle } from 'lucide-react'
import WalletGrid from './WalletGrid'
import { wallets } from './data/wallets'
import WalletInitializationModal from './WalletInitializationModal'
import { useRouter } from 'next/navigation'

const WalletConnectPage: React.FC = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const filteredWallets = wallets.filter(wallet =>
    wallet.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleWalletSelect = (walletId: string) => {
    setSelectedWallet(walletId)
    setShowModal(true)
    setError(null)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedWallet(null)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4'>
      <div className='container mx-auto px-4 py-12 max-w-6xl'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center mb-12'
        >
          <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text'>
            Connect Your Wallet
          </h1>
          <p className='text-lg text-gray-400'>
            Choose your preferred wallet to get started with Web3
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='max-w-md mx-auto mb-8'
        >
          <div className='relative'>
            <input
              type='text'
              placeholder='Search wallets...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='w-full px-6 py-3 bg-gray-800/50 backdrop-blur-sm rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-700/50'
            />
            {searchTerm ? (
              <button
                onClick={() => setSearchTerm('')}
                className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors'
              >
                <X size={20} />
              </button>
            ) : (
              <Search
                className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400'
                size={20}
              />
            )}
          </div>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className='max-w-md mx-auto mb-8 bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center'
            >
              <AlertCircle className='text-red-500 mr-3' />
              <p className='text-red-100'>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <WalletGrid
          wallets={filteredWallets}
          onWalletSelect={handleWalletSelect}
        />

        <WalletInitializationModal
          isOpen={showModal}
          onClose={handleCloseModal}
          wallet={wallets.find(w => w.id === selectedWallet)}
          onError={setError}
          onManualConnect={wallet => {
            router.push(`/Wallet/manual-connect?wallet=${wallet.id}`)
          }}
        />
      </div>
    </div>
  )
}

export default WalletConnectPage
