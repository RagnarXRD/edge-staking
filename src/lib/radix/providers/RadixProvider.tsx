"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  DataRequestBuilder,
  RadixDappToolkit,
  WalletDataState,
  createLogger,
} from "@radixdlt/radix-dapp-toolkit";
import { RadixContext } from "./radixContext";
import { RADIX_NETWORKID } from "@/constants/address";
import { store } from "@/lib/redux/store";
import { setAccountAddress } from "@/lib/redux/features/account-slice";
import { fetchBalances } from "@/utils/fetchers";

export const RadixProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<RadixDappToolkit | undefined>();

  // const dispatch = useAppDispatch();

  useEffect(() => {
    const radixDappToolkit = RadixDappToolkit({
      networkId: RADIX_NETWORKID,
      dAppDefinitionAddress: 'account_rdx12xns9r80v85m7gejg8ej9rmpa6e3zj0ycjm4aducwpzr6dmzvt6lkq',
      logger: createLogger(2),
    });

    radixDappToolkit.walletApi.setRequestData(
      DataRequestBuilder.accounts().atLeast(1)
    );

    console.log(radixDappToolkit.walletApi.walletData$.subscribe(async (walletData: WalletDataState) => {
      const data: WalletDataState = JSON.parse(JSON.stringify(walletData));
      console.log("data", data);
      if (data.accounts.length) {
        await fetchBalances(data.accounts[0].address)
      }
    }))

    setState(radixDappToolkit);
    console.log("WalletApi part:", radixDappToolkit)

    return () => {
      radixDappToolkit.destroy()
    }
  }, []);

  if (!state) return null;

  return (
    <RadixContext.Provider value={state}>{children}</RadixContext.Provider>
  );
}