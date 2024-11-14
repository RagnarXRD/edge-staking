import {
	CONTRACT_OWNER_BADGE_ADDRESS,
	EDG_RESOURCE_ADDRESS,
	SEDG_RESOURCE_ADDRESS,
} from "@/constants/address";
import type { FungibleResourcesCollectionItem } from "@radixdlt/radix-dapp-toolkit";
import BigNumber from "bignumber.js";
import numbro from "numbro";

export const BN = BigNumber.clone({
	DECIMAL_PLACES: 18,
	ROUNDING_MODE: BigNumber.ROUND_HALF_UP,
	EXPONENTIAL_AT: [-20, 20],
});

export const toLocaleFormat = (value: string) => {
	if (value === "") {
		return value;
	}
	value = value.replace(/[^0-9.]/g, "");
	const containsDot = value.includes(".");

	const parts = value.split(".");
	const integerPart = parts[0];
	const decimalPart = parts.length > 1 ? parts[1] : "";

	const formattedIntegerPart = parseInt(integerPart).toLocaleString();

	const answer =
		decimalPart || containsDot
			? formattedIntegerPart + "." + decimalPart
			: formattedIntegerPart;
	return answer;
};

export const extractBalances = (
	resources: ResourceDetails[],
	searchForOwner: boolean = false,
) => {
	let edgBalance: string | undefined;
	let sedgBalance: string | undefined;
	let isOwner = false;

	for (const resource of resources) {
		if (resource.resource_address === EDG_RESOURCE_ADDRESS) {
			console.log("EDG", resource.resource_address);
			edgBalance = resource.amount;
			console.log("edgBalance", edgBalance);
		} else if (resource.resource_address === SEDG_RESOURCE_ADDRESS) {
			console.log("sEDG", resource.resource_address);
			sedgBalance = resource.amount;
		} else if (
			searchForOwner &&
			resource.resource_address === CONTRACT_OWNER_BADGE_ADDRESS
		) {
			isOwner = true;
		}

		if (
			edgBalance !== undefined &&
			sedgBalance !== undefined &&
			(searchForOwner ? isOwner === true : true)
		) {
			break;
		}
	}

	return {
		edg: edgBalance || "0",
		sedg: sedgBalance || "0",
		isOwner,
	};
};

export const formatTokenAmount = (num: number | undefined, digits = 2) => {
	if (num === 0) return "0";
	if (!num) return "-";
	if (num < 0.001 && digits <= 3) {
		return "<0.001";
	}
	if (num < 0.01 && digits <= 2) {
		return "<0.01";
	}

	let formattedAmount = numbro(num)
		.formatCurrency({
			average: true,
			mantissa: num >= 1000 ? 2 : digits,
			abbreviations: {
				million: "M",
				billion: "B",
			},
		})
		.replace("$", "");

	formattedAmount = formattedAmount.replace(".00", "");
	return formattedAmount;
};

export function validateDecimalPlaces(numStr: string, maxDecimals: number) {
	const regex = new RegExp(`^\\d+(\\.\\d{0,${maxDecimals}})?$`);
	return regex.test(numStr);
}

export const extractBalancesNew = (
	resources: FungibleResourcesCollectionItem[],
	tokens: {
		symbol: string;
		address: string;
	}[],
	searchForOwner: boolean = false,
) => {
	const balances: { [symbol: string]: string } = {};
	let isOwner = false;
	console.log("extraido");

	// Initialize all token balances to "0"
	for (const token of tokens) {
		balances[token.symbol] = "0";
	}

	for (const resource of resources) {
		if (resource.aggregation_level === "Global") {
			const token = tokens.find((t) => t.address === resource.resource_address);
			if (token) {
				balances[token.symbol] = resource.amount;
			} else if (
				searchForOwner &&
				resource.resource_address === CONTRACT_OWNER_BADGE_ADDRESS &&
				+resource.amount > 0
			) {
				isOwner = true;
			}

			// Break the loop if all balances are found and check isOwner is true only if searchForOwner is true
			if (
				tokens.every((token) => balances[token.symbol] !== "0") &&
				(searchForOwner ? isOwner === true : true)
			) {
				break;
			}
		}
	}

	return {
		balances,
		isOwner,
	};
};
