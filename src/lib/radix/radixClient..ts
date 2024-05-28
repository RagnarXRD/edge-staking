import { DAPP_DEFINITION_ADDRESS, RADIX_NETWORKID } from "@/constants/address";
import { RadixDappToolkit, createLogger } from "@radixdlt/radix-dapp-toolkit";

export const radixDappToolkit = RadixDappToolkit({
  networkId: 1,
  dAppDefinitionAddress: "account_rdx129ak5rtrlrknmnjq58tj9nurnzq5rs5dt5244t3t7k04det7lwc7pq",
  logger: createLogger(2),
});

console.log("DAPP_DEFINITION_ADDRESS", DAPP_DEFINITION_ADDRESS)
export const walletApi = radixDappToolkit.walletApi