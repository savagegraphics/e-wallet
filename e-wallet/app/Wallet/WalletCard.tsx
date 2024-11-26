import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Wallet } from './types/wallet'

interface WalletCardProps {
  wallet: Wallet
  index: number
  onClick: () => void
}

const WalletCard: React.FC<WalletCardProps> = ({ wallet, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className='bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700/50 transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50'
      onClick={onClick}
    >
      <div className='w-16 h-16 mb-4 flex items-center justify-center'>
        <Image
          src={wallet.iconPath}
          alt={wallet.name}
          width={48}
          height={48}
          className={`w-12 h-12 ${wallet.className || ''}`}
        />
      </div>
      <h3 className='text-sm font-medium text-gray-200 text-center'>
        {wallet.name}
      </h3>
    </motion.div>
  )
}

export default WalletCard

