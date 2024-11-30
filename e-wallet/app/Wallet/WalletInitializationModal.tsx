import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle } from 'lucide-react'
import { Wallet } from './types/wallet'

interface WalletInitializationModalProps {
  isOpen: boolean
  onClose: () => void
  wallet: Wallet | undefined
  onError: (error: string) => void
  onManualConnect: (wallet: Wallet) => void
}

const WalletInitializationModal: React.FC<WalletInitializationModalProps> = ({
  isOpen,
  onClose,
  wallet,
  onError,
  onManualConnect
}) => {
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    if (isOpen) {
      setIsInitializing(true)
      // Simulate wallet initialization attempt
      const timer = setTimeout(() => {
        setIsInitializing(false)
        onError('Automatic connection failed. Please connect manually.')
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, onError])

  const handleManualConnect = () => {
    if (wallet) {
      onManualConnect(wallet)
    }
    onClose()
  }

  if (!isOpen || !wallet) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50'
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
          className='bg-gray-800 rounded-xl p-6 w-full max-w-md'
        >
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-bold text-white'>{wallet.name}</h2>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-white transition-colors'
            >
              <X size={24} />
            </button>
          </div>

          <AnimatePresence mode='wait'>
            {isInitializing ? (
              <motion.div
                key='initializing'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className='text-center'
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className='w-16 h-16 border-t-2 border-blue-500 border-solid rounded-full mx-auto mb-4'
                />
                <p className='text-gray-300'>
                  Attempting to connect to {wallet.name}...
                </p>
              </motion.div>
            ) : (
              <motion.div
                key='error'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className='text-center'
              >
                <AlertTriangle className='w-16 h-16 text-red-500 mx-auto mb-4' />
                <p className='text-red-400 mb-4'>
                  Automatic connection failed. Please connect manually.
                </p>
                <button
                  onClick={handleManualConnect}
                  className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors'
                >
                  Connect Manually
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default WalletInitializationModal
