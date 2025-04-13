import { AbiCoder, Contract } from "ethers";
import { useMemo } from "react";

import BaseMarketABI from "@/abi/BaseMarket.json"

import BaseNftABI from "@/abi/BaseNft.json"
import BaseCoinABI from "@/abi/BaseCoin.json"
import { IWeb3Context, useWeb3Context } from "@/context/web3Context";


export const coin = "0xac0b398fb41a7a3ac789ec3f743d2f95574df4d3" //"0xc8dc2a0c2ee0cdc3bea8961176bd88638e7634f6" 
export const nft = "0xec7903f848e623eaa94c090747a7e6bcd3a77008"// "0x30f6d11a066ec1343091b2dc108e6c3cd7faec10" 
export const market = "0xe48fad009f8fcef5995bf25946577531c33f0f04" //"0xd22caba8dfe5eb0ee64ec5f9b059a91874f4be84"

interface ContractNames {
    contracts: "BaseMarket" | "BaseCoin" | "BaseNft"
}

const useContract = ({ contracts }: ContractNames) => {
    const { state } = useWeb3Context() as IWeb3Context;
    const ContractABI = contracts == "BaseMarket" ? BaseMarketABI : contracts == "BaseCoin" ? BaseCoinABI : BaseNftABI;
    const address = contracts == "BaseMarket" ? market : contracts == "BaseCoin" ? coin : nft;
    return useMemo(
        () => state.signer && new Contract(address, ContractABI["abi"], state.signer),
        [state.signer]
    );
};

export default useContract;

