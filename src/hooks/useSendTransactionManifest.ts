import { TransactionManifests } from '@/lib/radix/transaction-manifests'
import { useCallback } from 'react'
import { useSendTransaction } from './useSendTransaction'

export const useSendTransactionManifest = () => {
  const transactionManifests = TransactionManifests()
  const sendTransaction = useSendTransaction()

  return useCallback(
    () => ({
      addStake: (accountAddress: string, tokensToStake: number) =>
        sendTransaction(
          transactionManifests.addStake(accountAddress, tokensToStake),
          'EDGing your $EDG I see'
        ),
      removeStake: (accountAddress: string, tokensToUnstake: number) =>
        sendTransaction(
          transactionManifests.removeStake(accountAddress, tokensToUnstake),
          'Are you cuming or going?'
        ),

    }),
    [sendTransaction, transactionManifests]
  )
}
