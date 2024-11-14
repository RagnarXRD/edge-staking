import { radixNetwork } from "@/constants/endpoints";
import { store } from "@/lib/redux/store";
import axios from "axios";
import { BN, extractBalances, extractBalancesNew } from "./format";
import {
	EDG_RESOURCE_ADDRESS,
	POOL_ADDRESS,
	SEDG_RESOURCE_ADDRESS,
} from "@/constants/address";
import { setAccountAddress } from "@/lib/redux/features/account-slice";
import { setSedgSupply } from "@/lib/redux/features/sedg-slice";
import type {
	FungibleResourcesCollectionItem,
	StateEntityFungiblesPageResponse,
} from "@radixdlt/radix-dapp-toolkit";
import { state } from "@/lib/radix/radixGateway";

interface BalanceResponse {
	edg: string;
	sedg: string;
}

const fetchAllFungibles = async (walletAddress: string) => {
	let allFungibleItems: FungibleResourcesCollectionItem[] = [];
	let nextCursor = undefined;
	let response: StateEntityFungiblesPageResponse;
	let state_version: number | undefined = undefined;
	do {
		response = await state.innerClient.entityFungiblesPage({
			stateEntityFungiblesPageRequest: {
				address: walletAddress,
				cursor: nextCursor,
				aggregation_level: "Global",
				at_ledger_state: state_version ? { state_version } : undefined,
			},
		});

		allFungibleItems = allFungibleItems.concat(response.items);
		nextCursor = response.next_cursor;
		state_version = response.ledger_state.state_version;
	} while (nextCursor);
	return allFungibleItems;
};

export const fetchBalances = async (
	walletAddress: string,
): Promise<BalanceResponse | undefined> => {
	if (!walletAddress) {
		console.warn("Wallet address is required");
		return;
	}
	const allFungibleItems = await fetchAllFungibles(walletAddress);

	try {
		const { balances } = extractBalancesNew(
			allFungibleItems,
			[
				{ symbol: "EDG", address: EDG_RESOURCE_ADDRESS },
				{ symbol: "sEDG", address: SEDG_RESOURCE_ADDRESS },
			],
			true,
		);

		console.log("balances:", balances);

		const EDGbalance = balances.EDG || "0";
		const sEDGbalance = balances.sEDG || "0";

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
