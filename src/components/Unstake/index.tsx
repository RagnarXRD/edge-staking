import { formatBalance } from '@/utils/formatBalance'
import React from 'react'
import ButtonComponent from '../Button'
import Image from 'next/image'
import { useConnectButtonState } from '@/hooks/useConnectButtonState'

interface StakeProps {
  buttonType: string
  setButtonType: (value: string) => void
  amount: string
  setAmount: (value: string) => void
  sEdgeBalance: string
  persona: boolean
  unstake: () => void
}
const activeButton = "h-full w-1/2 rounded-md px-4 py-2 bg-[#f87171] text-white"
const disabledButton = "h-full w-1/2 rounded-md px-4 py-2 bg-white text-black"

function Unstake({ buttonType, setButtonType, amount, setAmount, sEdgeBalance, persona, unstake }: StakeProps) {

  const connectButton = useConnectButtonState()

  return (
    <div className="flex bg-red-300 flex-col font-bold p-4 justify-between gap-4 rounded-md">
      <div className="flex w-full bg-white rounded-md p-1 justify-between">
        <button onClick={() => setButtonType('stake')} className={buttonType === 'stake' ? activeButton : disabledButton}>Stake</button>
        <button onClick={() => setButtonType('unstake')} className={buttonType === 'unstake' ? activeButton : disabledButton}>Unstake</button>
      </div>

      <div className="flex flex-col bg-red-400 rounded-xl text-sm p-4 gap-6 font-semibold md:gap-10">
        <div className="flex flex-col w-full ">
          <div className="flex w-full items-center justify-between">
            <input type="number" placeholder="0" onChange={(e) => setAmount((e.target.value))} value={amount} className="rounded-mdt bg-transparent h-[100%] w-[80%] text-2xl outline-none" />
            <Image src='/sEdge.jpeg' width={60} height={60} alt='EDGE EDGE' className="rounded-full bg-cover h-10 w-10" />
          </div>
          <p className="text-sm">~${formatBalance(Number(amount))} EDG</p>
        </div>
        <div className="flex w-full justify-between text-sm">
          <div className="flex items-center gap-2">
            <p>Available</p>
            <div className="flex gap-1 items-center">
              <Image src='/sEdge.jpeg' width={60} height={60} alt='EDGE EDGE' className="rounded-full bg-cover h-4 w-4" />
              <p>$EDG</p>
            </div>
          </div>
          <div>
            <p>${formatBalance(Number(sEdgeBalance))}</p>
          </div>
        </div>
      </div>
      {/* <button disabled={!persona} onClick={stake} className="rounded-md bg-white text-[#fe9ea4] py-4 disabled:bg-gray-300 disabled:cursor-not-allowed">
            {persona ? "STAKE" : "Connect your wallet"}
          </button> */}
      <ButtonComponent persona={persona} action={unstake} theme={connectButton} value={+amount} type='unstake' />
    </div>
  )
}

export default Unstake