import { DAPP_DEFINITION_ADDRESS, RADIX_NETWORKID } from "@/constants/address";
import { GatewayApiClient } from "@radixdlt/radix-dapp-toolkit";

const gatewayApi = GatewayApiClient.initialize({
	networkId: RADIX_NETWORKID,
	applicationName:
		process.env.NEXT_PUBLIC_AMBIENT === "prod"
			? "HIT Test Staking"
			: "HIT Staking",
	applicationVersion: "1",
	applicationDappDefinitionAddress: DAPP_DEFINITION_ADDRESS,
});

export const { status, transaction, stream, state } = gatewayApi;
