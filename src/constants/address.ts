export const RADIX_NETWORKID =
  process.env.NEXT_PUBLIC_AMBIENT === "prod"
    ? 1
    : 2;

export const EDG_RESOURCE_ADDRESS =
  process.env.NEXT_PUBLIC_AMBIENT === "prod"
    ? "resource_rdx1t5vjqccrdtvxruu0p2hwqpts326kpz674grrzulcquly5ue0sg7wxk"
    : "resource_tdx_2_1t5y7hyhjfa6nhhdla72etgjpyvm8hyq6s9carln923dezmalfjyd0w";

export const SEDG_RESOURCE_ADDRESS =
  process.env.NEXT_PUBLIC_AMBIENT === "prod"
    ? "resource_rdx1tkpdpn2c64plfwdgp49ym94gtsrh850zl55hmkcwln659qp0ql6j66"
    : "resource_tdx_2_1t4cecenms76ww64mgsm8reu2lmp5gmgeyaz6c5ueyqwhc4dvfg02wl";

export const STAKING_COMPONENT_ADDRESS =
  process.env.NEXT_PUBLIC_AMBIENT === "prod"
    ? "component_rdx1crwgsy90690eqh44gc0as320zf4qc34yyjucmcrygkuece5r6xv865"
    : "component_tdx_2_1cqg4m6pq2j2skqlac26f449h9ysr5xr5yjdprp5y2sqf8jcmeg5ne7";

export const DAPP_DEFINITION_ADDRESS =
  process.env.NEXT_PUBLIC_AMBIENT === "prod"
    ? "account_rdx129ak5rtrlrknmnjq58tj9nurnzq5rs5dt5244t3t7k04det7lwc7pq"
    : "account_tdx_2_12xv8cvdrwm4q0vk3qhrm2npcv4hhxquy7xkr28yx2zjsyn8039axz8";

export const POOL_ADDRESS =
  process.env.NEXT_PUBLIC_AMBIENT === "prod"
    ? "pool_rdx1cjdn663wfgrkxs9d52uhkhvgd9lqzz8440w3tgnzcxqll03mahhmgc"
    : "pool_tdx_2_1c3mdejzr7w5ckpmjcdtn5ycas98dsf27gdf3nk9zczvxne3j9rf606";

export const CONTRACT_OWNER_BADGE_ADDRESS =
  process.env.NEXT_PUBLIC_AMBIENT === "prod"
    ? "resource_rdx1nghg26uyljfavq6rwkuyfcpsxdhuxvj08jrsc82fadlxsjuhwm36ju"
    : "resource_tdx_2_1ng9sr8puzm3l958qda8vtra683dsdf7637rfel4ehhmxwcpuh9yyze";
