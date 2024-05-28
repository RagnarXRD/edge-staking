import { RadixContext } from '@/lib/radix/providers/radixContext'
import { useContext } from 'react'

export const useDappToolkit = () => useContext(RadixContext)!
