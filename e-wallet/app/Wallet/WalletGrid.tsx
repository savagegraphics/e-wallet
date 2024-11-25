import React from 'react'
import { motion } from 'framer-motion'
import WalletCard from './WalletCard'
import { Wallet } from './types/wallet'

interface WalletGridProps {
  wallets: Wallet[]
}

const WalletGrid: React.FC<WalletGridProps> = ({ wallets }) => {
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

export default WalletGrid
