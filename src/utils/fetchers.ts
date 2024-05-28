import { ociswap, radixNetwork } from "@/constants/endpoints";
import { store } from "@/lib/redux/store";
import axios, { AxiosResponse } from "axios";
import { extractBalances } from "./format";
import { POOL_ADDRESS } from "@/constants/address";
import { setAccountAddress } from "@/lib/redux/features/account-slice";
import { setSedgSupply } from "@/lib/redux/features/sedg-slice";

export const fetchBalances = async (walletAddress: string): Promise<any> => {
  let EDGbalance = "0";
  let sEDGbalance = "0";
  let isOwner = false;
  if (walletAddress) {
    try {
      const response = await axios.post(
        `${radixNetwork}/state/entity/details`,
        {
          addresses: [walletAddress],
        }
      );

      if (response.status === 200) {
        const balances = extractBalances(
          response.data.items[0].fungible_resources.items,
          true
        );
        EDGbalance = balances.edg;
        sEDGbalance = balances.sedg;
        isOwner = balances.isOwner;

        store.dispatch(setAccountAddress({ accountAddress: walletAddress, edgeBalance: EDGbalance, sEdgeBalance: sEDGbalance }));
      }

      return response as AxiosResponse;
    } catch (error) {
      console.log("error in fetchBalances", error);
    }
  }
  // store.dispatch();
};

// export const fetchEDGdata = async () => {
//   try {
//     // store.dispatch(setTokenDataLoading(true));
//     const data = await axios.get(
//       `${ociswap}/tokens/resource_rdx1t4v2jke9xkcrqra9sf3lzgpxwdr590npkt03vufty4pwuu205q03az`
//     );
//     if (data.status === 200) {
//       // store.dispatch(setHitPrice(+data.data.price.usd.now));
//       // store.dispatch(updateTokenData(data.data));
//     }
//   } catch (error) {
//     console.log("error in fetchHITdata", error);
//   }
//   // store.dispatch(setTokenDataLoading(false));
// };

export const fetchPoolDetails = async () => {
  let stakedEDG = "0";
  try {
    // store.dispatch(setPoolDataLoading(true));
    const response = await axios.post(
      `${radixNetwork}/state/entity/details`,
      {
        addresses: [POOL_ADDRESS],
      }
    );

    if (response.status === 200) {
      const balances = extractBalances(response.data.items[0].fungible_resources.items);
      stakedEDG = balances.edg;
      console.log(stakedEDG)
    }
  } catch (error) {
    console.log("error in fetchPoolDetails", error);
  }
  store.dispatch(setSedgSupply({ sEdg_totalSupply: stakedEDG }));
  // store.dispatch(setPoolDataLoading(false));
};