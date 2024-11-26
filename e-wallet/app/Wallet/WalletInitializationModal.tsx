import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, LoaderPinwheel } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Wallet } from './types/wallet'

interface WalletInitializationModalProps {
  isOpen: boolean
  onClose: () => void
  wallet: Wallet | undefined
  onError: (error: string) => void
}

const WalletInitializationModal: React.FC<WalletInitializationModalProps> = ({
  isOpen,
  onClose,
  wallet,
  onError
}) => {
  const [step, setStep] = useState<'initializing' | 'success' | 'error'>(
    'initializing'
  )
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      setStep('initializing')
      // Simulate wallet initialization
      const timer = setTimeout(() => {
        const success = Math.random() > 0.5 // Simulate success/failure
        if (success) {
          setStep('success')
        } else {
          setStep('error')
          onError(
            'Failed to initialize wallet automatically. Please try manual connection.'
          )
        }
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, onError, wallet])

  const handleManualConnect = () => {
    router.push('/Wallet/manual-connect')
    onClose()
  }

  const handleClose = () => {
    setStep('initializing')
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
              onClick={handleClose}
              className='text-gray-400 hover:text-white transition-colors'
            >
              <X size={24} />
            </button>
          </div>

          <AnimatePresence mode='wait'>
            {step === 'initializing' && (
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
                <p className='text-gray-300'>Initializing {wallet.name}...</p>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key='error'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className='text-center'
              >
                <LoaderPinwheel className='w-16 h-16 text-red-100 mx-auto mb-4' />
                <p className='text-red-300 mb-4'>
                  Failed to initialize wallet automatically.
                </p>
                <button
                  onClick={handleManualConnect}
                  className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors'
                >
                  Connect Manually
                </button>
              </motion.div>
            )}

            {step === 'error' && (
              <motion.div
                key='error'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className='text-center'
              >
                <LoaderPinwheel className='w-16 h-16 text-red-100 mx-auto mb-4' />
                <p className='text-red-300 mb-4'>
                  Failed to initialize wallet automatically.
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
