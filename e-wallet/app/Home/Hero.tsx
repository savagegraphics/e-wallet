'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings } from 'lucide-react'
import Link from 'next/link'

export default function Component () {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <header className='flex justify-between items-center mb-16'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='flex items-center space-x-2'
          >
            <Settings className='w-8 h-8 text-sky-400' />
            <h1 className='text-2xl font-bold tracking-tight'>COIN NODE</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Add any header buttons or menu items here */}
          </motion.div>
        </header>

        {/* Hero Content */}
        <div className='flex flex-col items-center justify-center space-y-12 mt-20'>
          <AnimatePresence>
            {mounted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className='text-center space-y-6'
              >
                <h2 className='text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-600'>
                  Secure Communication
                  <br />
                  for Web3
                </h2>
                <p className='max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 leading-relaxed'>
                  COIN NODE is an open protocol to communicate securely between
                  Wallets and Dapps (Web3 Apps). The protocol establishes a
                  remote connection using a Bridge server.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className='flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md'
          >
            <Link href='/Wallet'>
            <button className='w-full sm:w-auto px-8 py-3 bg-sky-500 text-white font-semibold rounded-full hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50'>
              Connect Wallet
            </button>
            </Link>

            <Link href='/Wallet'>
            <button className='w-full sm:w-auto px-8 py-3 bg-transparent border-2 border-sky-500 text-sky-500 font-semibold rounded-full hover:bg-sky-500 hover:text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50'>
              Collab Join
            </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Background Animation */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjAyIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=')] opacity-30" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          className='absolute inset-0 bg-gradient-to-br from-sky-400/20 to-indigo-600/20 blur-3xl'
        />
      </div>
    </div>
  )
}
