'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '../../lib/utils'

type ConnectionMethod = 'phrase' | 'keystore' | 'private-key'

export default function ManualConnectPage () {
  const [activeMethod, setActiveMethod] = useState<ConnectionMethod>('phrase')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Simulate connection attempt
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Simulate success (you would replace this with actual wallet connection logic)
    setSuccess(true)
    setIsLoading(false)
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4'>
      <div className='container mx-auto px-4 py-8 max-w-2xl'>
        <button
          onClick={handleBack}
          className='flex items-center text-gray-400 hover:text-white transition-colors mb-8'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to wallet selection
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-gray-800/50 backdrop-blur-sm rounded-xl p-8'
        >
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold mb-2 bg-gradient-to-r from-rose-100 to-teal-100 text-transparent bg-clip-text'>
              Connect Wallet Manually
            </h1>
            <p className='text-gray-400'>
              Choose your preferred method to connect your wallet
            </p>
          </div>

          <div className='flex space-x-1 mb-8 bg-gray-900/50 rounded-lg p-1'>
            {(['phrase', 'keystore', 'private-key'] as const).map(method => (
              <button
                key={method}
                onClick={() => setActiveMethod(method)}
                className={cn(
                  'flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                  activeMethod === method
                    ? 'bg-blue-500/20 text-rose-200'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                {method
                  .split('-')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <AnimatePresence mode='wait'>
              {activeMethod === 'phrase' && (
                <motion.div
                  key='phrase'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className='space-y-4'
                >
                  <div>
                    <label className='block text-sm font-medium text-gray-200 mb-2'>
                      Recovery Phrase
                    </label>
                    <textarea
                      className='w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all duration-200'
                      placeholder='Enter your recovery phrase'
                      rows={3}
                    />
                    <p className='mt-2 text-sm text-gray-400'>
                      Typically 12 (sometimes 24) words separated by a single
                      space
                    </p>
                  </div>
                </motion.div>
              )}

              {activeMethod === 'keystore' && (
                <motion.div
                  key='keystore'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className='space-y-4'
                >
                  <div>
                    <label className='block text-sm font-medium text-gray-200 mb-2'>
                      Keystore JSON
                    </label>
                    <textarea
                      className='w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all duration-200'
                      placeholder='Paste your keystore JSON'
                      rows={3}
                    />
                  </div>
                  <div className='relative'>
                    <label className='block text-sm font-medium text-gray-200 mb-2'>
                      Password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className='w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all duration-200'
                      placeholder='Enter password'
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-9 text-gray-400 hover:text-white transition-colors'
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </motion.div>
              )}

              {activeMethod === 'private-key' && (
                <motion.div
                  key='private-key'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className='space-y-4'
                >
                  <div>
                    <label className='block text-sm font-medium text-gray-200 mb-2'>
                      Private Key
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className='w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all duration-200'
                      placeholder='Enter your private key'
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-9 text-gray-400 hover:text-white transition-colors'
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className='flex items-center p-4 rounded-lg bg-red-500/10 border border-red-500/50'
                >
                  <AlertCircle className='h-5 w-5 text-red-500 mr-3' />
                  <p className='text-red-200 text-sm'>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type='submit'
              disabled={isLoading || success}
              className={cn(
                'w-full py-3 px-4 rounded-lg font-medium transition-all duration-200',
                isLoading || success
                  ? 'bg-blue-500/50 text-rose-200 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              )}
            >
              {isLoading ? (
                <span className='flex items-center justify-center'>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                    className='w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2'
                  />
                  Connecting...
                </span>
              ) : success ? (
                <span className='flex items-center justify-center'>
                  <CheckCircle2 className='w-5 h-5 mr-2' />
                  Connected Successfully
                </span>
              ) : (
                'Connect Wallet'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
