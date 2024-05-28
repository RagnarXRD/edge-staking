import { EDG_RESOURCE_ADDRESS, SEDG_RESOURCE_ADDRESS, STAKING_COMPONENT_ADDRESS } from '@/constants/address'

export const TransactionManifests = () => {
    const addStake = (accountAddress: string, tokensToStake: number) => {
        const transactionManifest = `
        CALL_METHOD
            Address("${accountAddress}")
            "withdraw"
            Address("${EDG_RESOURCE_ADDRESS}")
            Decimal("${tokensToStake}")
        ;
        TAKE_ALL_FROM_WORKTOP
            Address("${EDG_RESOURCE_ADDRESS}")
            Bucket("stakeBucket")
        ;
        CALL_METHOD
            Address("${STAKING_COMPONENT_ADDRESS}")
            "add_stake"
            Bucket("stakeBucket")
        ;
        CALL_METHOD
            Address("${accountAddress}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
        ;
    `
        console.log(transactionManifest)
        return transactionManifest
    }

    const removeStake = (accountAddress: string, tokensToUnstake: number) => {
        const transactionManifest = `
        CALL_METHOD
            Address("${accountAddress}")
            "withdraw"
            Address("${SEDG_RESOURCE_ADDRESS}")
            Decimal("${tokensToUnstake}")
        ;
        TAKE_ALL_FROM_WORKTOP
            Address("${SEDG_RESOURCE_ADDRESS}")
            Bucket("unstakeBucket")
        ;
        CALL_METHOD
            Address("${STAKING_COMPONENT_ADDRESS}")
            "remove_stake"
            Bucket("unstakeBucket")
        ;
        CALL_METHOD
            Address("${accountAddress}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
        ;
    `
        console.log(transactionManifest)
        return transactionManifest
    }

    return { addStake, removeStake }
}
