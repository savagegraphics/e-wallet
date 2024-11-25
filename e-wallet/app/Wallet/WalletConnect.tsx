'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import WalletGrid from './WalletGrid'
import { wallets } from './data/wallets'

export default function WalletConnectPage () {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredWallets = wallets.filter((wallet: { name: string }) =>
    wallet.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
      <div className='container mx-auto px-4 py-12 max-w-6xl'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center mb-12'
        >
          <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text'>
            Connect A Wallet
          </h1>
          <p className='text-lg text-gray-400'>
            Select a wallet to continue with your journey
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='max-w-md mx-auto mb-12'
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

        <WalletGrid wallets={filteredWallets} />
      </div>
    </div>
  )
}
