"use client"

import ConnectButton from "@/lib/radix/ConnectButton";
import Image from "next/image";
import { BsTwitterX } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { SiGitbook } from "react-icons/si";
import styles from './colorchange.module.css'
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePersona } from "@/hooks/usePersona";
import { useSendTransactionManifest } from "@/hooks/useSendTransactionManifest";
import { fetchBalances, fetchPoolDetails } from "@/utils/fetchers";
import { useConnectButtonState } from "@/hooks/useConnectButtonState";
import { useAppSelector } from "@/lib/redux/hooks/hooks";
import { formatBalance } from "@/utils/formatBalance";
import Stake from "@/components/Stake";
import Unstake from "@/components/Unstake";
import { useQuery } from "@tanstack/react-query";
import { BN } from "@/utils/format";

const yearlyEdgReward = 24024406666.65

export default function Home() {
  const [buttonType, setButtonType] = useState('stake')
  const [amount, setAmount] = useState("0")

  const { addStake, removeStake } = useSendTransactionManifest()()

  const { accountAddress, edgeBalance, sEdgeBalance } = useAppSelector(state => state.accountAddressReducer)
  const { sEdg_totalSupply } = useAppSelector(state => state.setSedgSupplyReducer)

  const { persona } = usePersona()

  const connectButton = useConnectButtonState()

  useQuery({
    queryKey: ['details'],
    queryFn: async () => {
      await fetchPoolDetails();
    }
  });

  useQuery({
    queryKey: ['balances'],
    queryFn: async () => {
      const response = await fetchBalances(accountAddress);

      return response
    },
    enabled: Boolean(connectButton === "success" && accountAddress)
  });

  const stake = async () => {
    const total = BN(amount)
    console.log(total)
    try {
      addStake(accountAddress, total)

    } catch (error) {
      console.log(error)
    }
  }

  const unstake = async () => {
    const total = BN(amount)
    console.log(total.toFixed())
    try {
      removeStake(accountAddress, total)
    } catch (error) {
      console.log(error)
    }
  }


  const apy = useMemo(() => ((yearlyEdgReward / +sEdg_totalSupply) * 100).toFixed(2), [sEdg_totalSupply]);

  return (
    <main className="h-screen w-full flex flex-col p-4 items-center">
      <div className="flex w-full h-20 items-center justify-center">
        <div className="flex w-full justify-between items-center h-full">
          <div className="flex items-center gap-2">
            <div className={`p-1 bg-red-200 rounded-full shadow-md ${styles.colorChange200}`}>
              <div className={`p-1 bg-red-300 rounded-full shadow-md ${styles.colorChange300}`}>
                <div className="flex items-center">
                  <div className={`p-1 bg-red-400 rounded-full ${styles.colorChange400}`}>
                    <Image src='/new logo800.png' width={60} height={60} alt='EDGE EDGE' />
                  </div>
                </div>
              </div>
            </div>
            <h1 className={`hidden md:block font-bold text ${styles.colorChange}`}>EDGE</h1>
          </div>

          <div className="flex items-center gap-2">
            <a href="https://x.com/EDGECLUB_XRD" target="_blank" className="hover:scale-105 duration-200 p-2 rounded-full bg-[#f87171]">
              <BsTwitterX />
            </a>
            <a href="https://t.me/edgemasters" target="_blank" className="hover:scale-105 duration-200 p-2 rounded-full bg-[#f87171]">
              <FaTelegramPlane />
            </a>
            <a href="https://edge-club.gitbook.io/edge-club" target="_blank" className="hover:scale-105 duration-200 p-2 rounded-full bg-[#f87171]">
              <SiGitbook />
            </a>
            <ConnectButton />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4 md:w-[40rem]">
        <div className="flex flex-col p-4 hover:scale-[1.02] duration-200 items-start bg-white rounded-md text-black text-sm font-medium">
          <h1>Staking APY%</h1>
          <h2 className="text-xl font-semibold">{apy + "%"}</h2>
        </div>
        <div className="flex flex-col p-4 hover:scale-[1.02] duration-200 items-start bg-white rounded-md text-black text-sm font-medium">
          <h1>Total Staked</h1>
          <h2 className="text-xl font-semibold">{formatBalance(parseFloat(sEdg_totalSupply))} <span className="text-[#f87171] font-medium">$EDG</span></h2>
        </div>

        {buttonType === "stake"
          ?
          (
            <Stake buttonType={buttonType}
              setButtonType={setButtonType}
              amount={amount}
              setAmount={setAmount}
              edgeBalance={edgeBalance || ""}
              persona={Boolean(persona)}
              stake={stake}
            />
          )
          :
          (
            <Unstake buttonType={buttonType}
              setButtonType={setButtonType}
              amount={amount}
              setAmount={setAmount}
              sEdgeBalance={sEdgeBalance || ""}
              persona={Boolean(persona)}
              unstake={unstake}
            />
          )
        }
      </div>
    </main>
  );
}
