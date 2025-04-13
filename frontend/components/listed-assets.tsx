"use client"
import { IWeb3Context, useWeb3Context } from '@/context/web3Context';
import useContract from '@/hooks/useReadContract';
import { ListedNFT } from '@/interface/nft';
import React, { useEffect, useState } from 'react'
import { NFTCardSeleton } from './nft-card';
import SaleCard from './sale-card';

function ListedAssets() {
    const [isLoading, setLoading] = useState<boolean>(false);
    const { state } = useWeb3Context() as IWeb3Context;
    const market_contract = useContract({ contracts: "BaseMarket" });
    const nft_contract = useContract({ contracts: "BaseNft" });
    const [listedNfts, setListedNfts] = useState<ListedNFT[]|null>()

    
    useEffect(() => {
        getListedNFts()
    }, [])
    const getListedNFts = async ()=>{
        try {
          setLoading(true)
            const listedAssets = await market_contract?.getListedAssets(0, 10);
            console.log(listedAssets)
            
            let allItems = [];
            for (const item of listedAssets!){
              console.log(item)
              const [tokenId, price, owner] = item as any;
              allItems.push({
                tokenId,
                price,
                owner
              })
          }
          console.log(allItems);

          const nftData = await Promise.all(
            Array.from(allItems).map(async (item)=>{
                try {
                    let tokenUri = await nft_contract?.tokenURI(item.tokenId);
                    if(tokenUri == ""){
                        return {
                            ...item
                        }
                    }
                    const res = fetch(tokenUri);
                    const data = await (await res).json();
                    console.log(data)
                    return {
                        ...data,
                        ...item
                    } as ListedNFT;
                } catch (error) {
                   console.error(error) 
                   return null
                }
            })
        )

        setListedNfts(nftData as any);
        setLoading(false)

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
      <section className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' >
         {
          isLoading ? [1,2,3,4,5].map((i)=>{
            return <NFTCardSeleton key={i} />
        }):
        listedNfts?.map((nft)=>
                <SaleCard key={nft?.tokenId} nft={nft} />
            )
         }
      </section>
    </div>
  )
}

export default ListedAssets