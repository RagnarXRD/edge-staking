import { ociswap, radixNetwork } from "@/constants/endpoints";
import { store } from "@/lib/redux/store";
import axios, { type AxiosResponse } from "axios";
import { BN, extractBalances } from "./format";
import { POOL_ADDRESS } from "@/constants/address";
import { setAccountAddress } from "@/lib/redux/features/account-slice";
import { setSedgSupply } from "@/lib/redux/features/sedg-slice";

interface BalanceResponse {
	edg: string;
	sedg: string;
}

export const fetchBalances = async (
	walletAddress: string,
): Promise<BalanceResponse | undefined> => {
	if (!walletAddress) {
		console.warn("Wallet address is required");
		return;
	}

	let allFungibleResources: any[] = [];
	let nextCursor: string | null = null;

	try {
		do {
			const response = await axios.post(
				`${radixNetwork}/state/entity/details`,
				{
					addresses: [walletAddress],
					cursor: nextCursor,
				},
			);

			if (response.status === 200) {
				const { items } = response.data.items[0].fungible_resources;
				allFungibleResources = [...allFungibleResources, ...items];
				nextCursor = response.data.items[0].fungible_resources.next_cursor;
			} else {
				console.error(
					"Failed to fetch data:",
					response.status,
					response.statusText,
				);
				return;
			}
		} while (nextCursor);

		const balances = extractBalances(allFungibleResources, true);
		const EDGbalance = balances.edg || "0";
		const sEDGbalance = balances.sedg || "0";

		// Dispatch the balance to the store
		store.dispatch(
			setAccountAddress({
				accountAddress: walletAddress,
				edgeBalance: EDGbalance,
				sEdgeBalance: sEDGbalance,
			}),
		);

		return { edg: EDGbalance, sedg: sEDGbalance };
	} catch (error) {
		console.error("Error in fetchBalances:", error);
	}
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
		const response = await axios.post(`${radixNetwork}/state/entity/details`, {
			addresses: [POOL_ADDRESS],
		});

		if (response.status === 200) {
			const balances = extractBalances(
				response.data.items[0].fungible_resources.items,
			);
			stakedEDG = balances.edg;
		}
	} catch (error) {
		console.log("error in fetchPoolDetails", error);
	}
	store.dispatch(setSedgSupply({ sEdg_totalSupply: stakedEDG }));
	// store.dispatch(setPoolDataLoading(false));
};

export const getSelectedBalance = (tab: string) => {
	const state = store.getState();
	const {
		accountAddressReducer: { edgeBalance, sEdgeBalance },
	} = state;
	return "stake" ? BN(edgeBalance || "") : BN(sEdgeBalance || "");
};
