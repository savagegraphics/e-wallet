import React from 'react'
import { motion } from 'framer-motion'
import { XCircle } from 'lucide-react'

interface SuccessErrorOverlayProps {
  onClose: () => void
  walletName: string
}

const SuccessErrorOverlay: React.FC<SuccessErrorOverlayProps> = ({
  onClose,
  walletName
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className='relative p-8 w-full max-w-2xl text-center'
      >
        <XCircle className='w-32 h-32 text-red-500 mx-auto mb-8' />
        <h2 className='text-4xl font-bold mb-4 text-white'>Connection Error</h2>
        <p className='text-xl text-gray-300 mb-8'>
          We&apos;re sorry, but we couldn&apos;t establish a secure connection
          to your {walletName} wallet at this time. Please try again or choose a
          different wallet.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className='bg-red-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-600 transition-colors'
        >
          Return to Wallet Selection
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default SuccessErrorOverlay
