"use client"

import ConnectButton from "@/lib/radix/ConnectButton";
import Image from "next/image";
import { BsTwitterX } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { SiGitbook } from "react-icons/si";
import styles from './colorchange.module.css'
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePersona } from "@/hooks/usePersona";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSendTransactionManifest } from "@/hooks/useSendTransactionManifest";
import { fetchBalances, fetchPoolDetails } from "@/utils/fetchers";
import { useConnectButtonState } from "@/hooks/useConnectButtonState";
import { useAppSelector } from "@/lib/redux/hooks/hooks";
import { formatBalance } from "@/utils/formatBalance";
import ButtonComponent from "@/components/Button";
import Stake from "@/components/Stake";
import Unstake from "@/components/Unstake";



const yearlyEdgReward = 24024406666.65
const weeklyEdgReward = 2002033888.8875

export default function Home() {
  const [buttonType, setButtonType] = useState('stake')
  const [amount, setAmount] = useState("0")
  const [loading, setLoading] = useState(false)

  const { addStake, removeStake } = useSendTransactionManifest()()

  const { edgeBalance, sEdgeBalance } = useAppSelector(state => state.accountAddressReducer)
  const { sEdg_totalSupply } = useAppSelector(state => state.setSedgSupplyReducer)

  const { persona } = usePersona()


  const fetchDetails = useCallback(() => {
    fetchPoolDetails();
  }, []);

  useEffect(() => {
    fetchDetails();
    const intervalId = setInterval(fetchDetails, 30000);

    return () => clearInterval(intervalId);
  }, [fetchDetails]);

  const stake = async () => {
    try {
      addStake('account_tdx_2_12xv8cvdrwm4q0vk3qhrm2npcv4hhxquy7xkr28yx2zjsyn8039axz8', Number(amount)).then(
        () => {
          setLoading(false)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const unstake = async () => {
    try {
      removeStake('account_tdx_2_12xv8cvdrwm4q0vk3qhrm2npcv4hhxquy7xkr28yx2zjsyn8039axz8', Number(amount)).then(
        () => {
          setLoading(false)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const apy = useMemo(() => ((weeklyEdgReward / +sEdg_totalSupply) * 100).toFixed(2), [sEdg_totalSupply]);

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

        {/* <div className="grid grid-cols-2 w-full gap-2"> */}
        <div className="flex flex-col p-4 hover:scale-[1.02] duration-200 items-start bg-white rounded-md text-black text-sm font-medium">
          <h1>Staking APY%</h1>
          <h2 className="text-xl font-semibold">{apy + "%"}</h2>
        </div>
        <div className="flex flex-col p-4 hover:scale-[1.02] duration-200 items-start bg-white rounded-md text-black text-sm font-medium">
          <h1>Total Staked</h1>
          <h2 className="text-xl font-semibold">{formatBalance(Number(sEdg_totalSupply))} <span className="text-[#f87171] font-medium">$EDG</span></h2>
        </div>
        {/* <div className="flex flex-col p-4 hover:scale-[1.02] duration-200 items-start bg-white rounded-md text-black text-sm font-medium">
          <h1><span className="text-[#f87171]">sEDG</span> Price</h1>
          <h2 className="text-xl font-semibold">0.00 <span className="text-[#f87171] font-medium">$sEDG</span></h2>
        </div> */}
        {/* </div> */}

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
