import { DAPP_DEFINITION_ADDRESS, RADIX_NETWORKID } from "@/constants/address";
import { RadixDappToolkit, createLogger } from "@radixdlt/radix-dapp-toolkit";

export const radixDappToolkit = RadixDappToolkit({
  networkId: RADIX_NETWORKID,
  dAppDefinitionAddress: DAPP_DEFINITION_ADDRESS,
  logger: createLogger(2),
});

console.log("DAPP_DEFINITION_ADDRESS", DAPP_DEFINITION_ADDRESS)
export const walletApi = radixDappToolkit.walletApi