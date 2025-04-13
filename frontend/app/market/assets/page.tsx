"use client"
import NFTCard, { NFTCardSeleton } from '@/components/nft-card';
import { IWeb3Context, useWeb3Context } from '@/context/web3Context';
import useContract from '@/hooks/useReadContract';
import { NFT } from '@/interface/nft';
import React, { useEffect, useState } from 'react'

function Assets() {
    const { state } = useWeb3Context() as IWeb3Context;
    const contract = useContract({ contracts: "BaseNft" });
    const [nfts, setNfts] = useState<NFT[]>()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        
        getNfts()
    }, [])

    const getNfts = async ()=>{
        setLoading(true)
        const filter = contract?.filters.Transfer(null, state.address);
        const block = await contract?.deploymentTransaction()?.getBlock()
        const events = await contract?.queryFilter(filter!,block?.number,  "latest")

        console.log(events)
        const tokenIDs = new Set();

        for (const event of events!){
            const {from, to, tokenId} = (event as any)?.args as any;
            tokenIDs.add(tokenId)
        }

        console.log(tokenIDs)
        const verifiedOwned = [];
        for (const id of tokenIDs){
            try {
                const currentOwner = await contract?.ownerOf(id);
                console.log(currentOwner)
                if(currentOwner.toLowerCase() == state.address?.toLowerCase()){
                    verifiedOwned.push(id);
                }

            } catch (error) {
                console.warn("Failed to verify nft")
            }
        }
        console.log(verifiedOwned);

        // fetch ipfs data
        const nftData = await Promise.all(
            Array.from(verifiedOwned).map(async (tokenId)=>{
                try {
                    let tokenUri = await contract?.tokenURI(tokenId);
                    if(tokenUri == ""){
                        return {
                            tokenId
                        }
                    }
                    const res = fetch(tokenUri);
                    const data = await (await res).json();
                    console.log(data)
                    return {
                        tokenId,
                        ...data
                    }
                } catch (error) {
                   console.error(error) 
                }
            })
        )

        setNfts(nftData)
        setLoading(false);
    }
    
  return (
    <section className=' px-16 py-16'>
        <h1 className=' text-2xl font-bold mb-4'>Your NFTs</h1>
        <div className=' grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        { isLoading ? [1,2,3,4,5].map((i)=>{
            return <NFTCardSeleton key={i} />
        }):
            nfts?.map((nft)=>
                <NFTCard nft={nft} key={nft?.tokenId} />
            )
        }
    </div> 
    </section>
  )
}

export default Assets