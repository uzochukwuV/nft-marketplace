"use client"

import { IWeb3Context, useWeb3Context } from '@/context/web3Context';
import useContract, { market } from '@/hooks/useReadContract';
import { ethers } from 'ethers';

import React, { useEffect, useState } from 'react'

function UserTransacions() {
    const { state } = useWeb3Context() as IWeb3Context;
    const market_contract = useContract({ contracts: "BaseMarket" });
    const nft_contract = useContract({ contracts: "BaseNft" });
    const [transactions , setTransactions] = useState<any>()
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getUserLogs()
    }, [])
    

    async function getUserLogs() {
        setLoading(true)
        const filter = market_contract?.filters.AssetListed(null, null, null);
        const block = await market_contract?.deploymentTransaction()?.getBlock()
        const events = await market_contract?.queryFilter(filter!,block?.number,  "latest")

        console.log(events)

        let eventData = []

        for (const event of events!){
            const [tokenId,price, address] = (event as any)?.args as any;
            console.log(address)
            if(address.toLowerCase() == state.address){
                eventData.push({price, address, tokenId, type:"AssetListed", contract:"BaseMarket"});
            }
        }
        setTransactions(eventData)
        console.log(eventData)
        const filter2 = market_contract?.filters.AssetPurchased(null, null, null);
        const events2 = await market_contract?.queryFilter(filter!,block?.number,  "latest")
        
        let eventData2 = []

        for (const event of events2!){
            const [tokenId,price, address, address2 ] = (event as any)?.args as any;
            console.log(address)
            if(address.toLowerCase() == state.address || address2.toLowerCase() == state.address){
                eventData2.push({price, address, tokenId, type:"AssetPurchased", contract:"BaseMarket"});
            }
        }
        console.log(eventData2)
        setLoading(false)
      }
  return (
    <div>
        <section className='relative antialiased text-pretty px-12'>
                <div className='space-y-4'>
                    {  !isLoading &&
                        transactions?.map((trx:any)=>{
                            return <div className=' px-6 rounded-2xl py-4 bg-zinc-600 flex justify-between items-center'>
                                <div>
                                    {trx.contract} 
                                </div>
                                <div>
                                    {trx.type}
                                </div>
                                <div>
                                    to :{trx.address}
                                </div>
                                <div>
                                    data: {trx.price} {trx.tokenId}
                                </div>
                            </div>
                        })
                    }
                </div>
        </section>
    </div>
  )
}

export default UserTransacions