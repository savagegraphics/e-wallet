'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import {
  Github,
  Twitter,
  DiscIcon as Discord,
  RssIcon as Reddit
} from 'lucide-react'
import Link from 'next/link'

const CountingNumber = ({
  value,
  duration = 1.5
}: {
  value: number
  duration?: number
}) => {
  const [count, setCount] = useState(0)
  const elementRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(elementRef, { once: true, margin: '-50px' })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = value
      const incrementTime = (duration * 1000) / end
      const counter = setInterval(() => {
        start += 1
        setCount(start)
        if (start >= end) clearInterval(counter)
      }, incrementTime)

      return () => clearInterval(counter)
    }
  }, [value, duration, isInView])

  return <span ref={elementRef}>{count}</span>
}

export default function Component () {
  const stats = [
    { value: 50, label: 'Active Wallets', unit: 'k' },
    { value: 200, label: 'Resolved Issues', unit: 'k' },
    { value: 101, label: 'Contributors', unit: 'k' }
  ]

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Discord, href: '#', label: 'Discord' },
    { icon: Reddit, href: '#', label: 'Reddit' }
  ]

  return (
    <footer className='bg-gradient-to-b from-gray-900 to-black text-white py-8 overflow-hidden'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-center'>
          {/* Distribution Stats */}
          <div className='lg:col-span-2'>
            <h2 className='text-lg font-semibold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'>
              Distribution
            </h2>
            <div className='grid grid-cols-3 gap-4'>
              {stats.map(stat => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className='p-3 rounded-lg bg-gradient-to-b from-blue-500/10 to-blue-500/5 border border-blue-500/20 text-center'
                >
                  <p className='text-xl font-bold text-blue-400'>
                    <CountingNumber value={stat.value} />
                    {stat.unit}
                  </p>
                  <p className='text-xs text-gray-400'>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className='text-center lg:text-right'>
            <p className='text-sm mb-2'>Ready to resolve blockchain issues?</p>
            <p className='text-xs text-gray-400 mb-3'>
              We are here to provide help.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-300 shadow-md shadow-blue-500/25'
            >
              Get Started
            </motion.button>
          </div>
        </div>

        {/* Divider */}
        <hr className='my-6 border-gray-800' />

        {/* Bottom Footer */}
        <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
          {/* Copyright */}
          <p className='text-xs text-gray-500'>Copyright 2024. Dex Tools.</p>

          {/* Social Links */}
          <div className='flex space-x-4'>
            {socialLinks.map(social => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className='text-gray-400 hover:text-blue-400 transition-colors duration-300'
                aria-label={social.label}
              >
                <social.icon className='w-5 h-5' />
              </motion.a>
            ))}
          </div>

          {/* Footer Links */}
          <div className='flex space-x-4 text-xs'>
            <Link
              href='/privacy'
              className='text-gray-400 hover:text-blue-400 transition-colors duration-300'
            >
              Privacy Policy
            </Link>
            <Link
              href='/terms'
              className='text-gray-400 hover:text-blue-400 transition-colors duration-300'
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
