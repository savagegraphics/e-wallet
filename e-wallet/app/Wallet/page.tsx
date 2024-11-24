'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'

// Types
interface Wallet {
  id: string
  name: string
  icon: string
}

// Comprehensive list of wallets
const wallets: Wallet[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: 'https://tokenicons.s3.amazonaws.com/128/metamask.png'
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: 'https://tokenicons.s3.amazonaws.com/128/walletconnect.png'
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: 'https://tokenicons.s3.amazonaws.com/128/coinbase.png'
  },
  {
    id: 'trustwallet',
    name: 'Trust Wallet',
    icon: 'https://tokenicons.s3.amazonaws.com/128/trust.png'
  },
  {
    id: 'phantom',
    name: 'Phantom',
    icon: 'https://tokenicons.s3.amazonaws.com/128/phantom.png'
  },
  {
    id: 'brave',
    name: 'Brave Wallet',
    icon: 'https://tokenicons.s3.amazonaws.com/128/brave.png'
  },
  {
    id: 'ledger',
    name: 'Ledger',
    icon: 'https://tokenicons.s3.amazonaws.com/128/ledger.png'
  },
  {
    id: 'trezor',
    name: 'Trezor',
    icon: 'https://tokenicons.s3.amazonaws.com/128/trezor.png'
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    icon: 'https://tokenicons.s3.amazonaws.com/128/rainbow.png'
  },
  {
    id: 'argent',
    name: 'Argent',
    icon: 'https://tokenicons.s3.amazonaws.com/128/argent.png'
  },
  {
    id: 'gnosis',
    name: 'Gnosis Safe',
    icon: 'https://tokenicons.s3.amazonaws.com/128/gnosis-safe.png'
  },
  {
    id: 'crypto',
    name: 'Crypto.com',
    icon: 'https://tokenicons.s3.amazonaws.com/128/crypto.png'
  },
  {
    id: 'imtoken',
    name: 'imToken',
    icon: 'https://tokenicons.s3.amazonaws.com/128/imtoken.png'
  },
  {
    id: 'onto',
    name: 'ONTO',
    icon: 'https://tokenicons.s3.amazonaws.com/128/onto.png'
  },
  {
    id: 'mathwallet',
    name: 'MathWallet',
    icon: 'https://tokenicons.s3.amazonaws.com/128/mathwallet.png'
  },
  {
    id: 'bitpay',
    name: 'BitPay',
    icon: 'https://tokenicons.s3.amazonaws.com/128/bitpay.png'
  },
  {
    id: 'zerion',
    name: 'Zerion',
    icon: 'https://tokenicons.s3.amazonaws.com/128/zerion.png'
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable Domains',
    icon: 'https://tokenicons.s3.amazonaws.com/128/unstoppable.png'
  },
  {
    id: 'exodus',
    name: 'Exodus',
    icon: 'https://tokenicons.s3.amazonaws.com/128/exodus.png'
  },
  {
    id: 'torus',
    name: 'Torus',
    icon: 'https://tokenicons.s3.amazonaws.com/128/torus.png'
  },
  {
    id: 'polkadot',
    name: 'Polkadot Wallet',
    icon: 'https://tokenicons.s3.amazonaws.com/128/polkadot.png'
  },
  {
    id: 'keplr',
    name: 'Keplr',
    icon: 'https://tokenicons.s3.amazonaws.com/128/keplr.png'
  },
  {
    id: 'solflare',
    name: 'Solflare',
    icon: 'https://tokenicons.s3.amazonaws.com/128/solflare.png'
  },
  {
    id: 'stellar',
    name: 'Stellar',
    icon: 'https://tokenicons.s3.amazonaws.com/128/stellar.png'
  }
]

// Components
const WalletCard: React.FC<{ wallet: Wallet; index: number }> = ({
  wallet,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className='bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700/50 transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50'
    >
      <div className='w-16 h-16 mb-4 flex items-center justify-center'>
        <img
          src={wallet.icon}
          alt={wallet.name}
          className='w-12 h-12'
          onError={e => {
            e.currentTarget.src =
              'https://tokenicons.s3.amazonaws.com/128/wallet.png'
          }}
        />
      </div>
      <h3 className='text-sm font-medium text-gray-200 text-center'>
        {wallet.name}
      </h3>
    </motion.div>
  )
}

const WalletGrid: React.FC<{ wallets: Wallet[] }> = ({ wallets }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4'
    >
      {wallets.map((wallet, index) => (
        <WalletCard key={wallet.id} wallet={wallet} index={index} />
      ))}
    </motion.div>
  )
}

const WalletConnectPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredWallets = wallets.filter(wallet =>
    wallet.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-4'>
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

        <WalletGrid wallets={filteredWallets} />
      </div>
    </div>
  )
}

export default WalletConnectPage
