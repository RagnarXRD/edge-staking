import { CONTRACT_OWNER_BADGE_ADDRESS, EDG_RESOURCE_ADDRESS, SEDG_RESOURCE_ADDRESS } from "@/constants/address";


export const extractBalances = (
  resources: ResourceDetails[],
  searchForOwner: boolean = false
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
    } else if (searchForOwner && resource.resource_address === CONTRACT_OWNER_BADGE_ADDRESS) {
      isOwner = true;
    }

    // Break the loop if both balances are found and check isOwner is true only if searchForOwner is true
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