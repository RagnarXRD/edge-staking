import { TransactionManifests } from '@/lib/radix/transaction-manifests'
import { useCallback } from 'react'
import { useSendTransaction } from './useSendTransaction'
import BigNumber from 'bignumber.js'

export const useSendTransactionManifest = () => {
  const transactionManifests = TransactionManifests()
  const sendTransaction = useSendTransaction()

  return useCallback(
    () => ({
      addStake: (accountAddress: string, tokensToStake: BigNumber) =>
        sendTransaction(
          transactionManifests.addStake(accountAddress, tokensToStake),
          'EDGing your $EDG I see'
        ),
      removeStake: (accountAddress: string, tokensToUnstake: BigNumber) =>
        sendTransaction(
          transactionManifests.removeStake(accountAddress, tokensToUnstake),
          'Are you cuming or going?'
        ),

    }),
    [sendTransaction, transactionManifests]
  )
}
