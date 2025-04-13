"use client"

import { IWeb3Context, useWeb3Context } from '@/context/web3Context';
import useContract, { market } from '@/hooks/useReadContract';
import { NFT } from '@/interface/nft'
import { parseEther } from 'ethers';
import React, { Ref, RefObject, useRef, useState } from 'react'

function NFTCard({ nft }: { nft: NFT }) {
    const radioRef = useRef<HTMLInputElement | null>(null);
    const { state } = useWeb3Context() as IWeb3Context;
    const [isLoading, setLoading] = useState<boolean>(false);
    const [price, setPrice] = useState<number>()
    const market_contract = useContract({ contracts: "BaseMarket" });
    const nft_contract = useContract({ contracts: "BaseNft" });

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const nft_trx = await nft_contract?.approve(market, nft?.tokenId);
            await nft_trx?.wait();
            const transaction = await market_contract?.listNFT(nft?.tokenId, parseEther(price!.toString()));
            await transaction.wait();
            setPrice(0)
            setLoading(false)
            radioRef.current!.checked = false;
        } catch (error) {
            console.log(error)
        }

        // e.currentTarget.reset()
    }
    console.log(nft)
    return (
        <div>

            <input type="radio" hidden ref={radioRef} id={nft?.tokenId?.toString()} name='list_for_sale' data-value="nft-card" value={nft?.tokenId} />
            <div className=' invisible opacity-0 transition-all delay-75 duration-150 absolute top-0 left-0 right-0 bottom-0 bg-black/20 z-20'>
                <div className="h-full w-full flex justify-center items-center">
                    <div className="max-w-[500px] w-full h-[500px] bg-zinc-800 rounded-2xl">
                        <div className=' h-full w-full p-4 pt-4'>
                            <div className=' flex justify-end'>
                                <div onClick={() => {
                                    radioRef.current!.checked = false;
                                }}
                                    className=' rounded-full bg-zinc-600 hover:bg-zinc-500'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                                </div>
                            </div>
                            <div className=' h-1/2 my-2'>
                                {
                                    nft?.media_type?.toLowerCase() == "image" ?
                                        <img src={nft?.image_url} alt="" className=' relative block h-full rounded-2xl  w-full object-cover aspect-square' />
                                        : <video src={nft?.image_url} className=' relative block h-full rounded-2xl  w-full object-cover aspect-square' />
                                }
                            </div>
                            <div>
                                <h3 className=' text-2xl font-semibold mb-4'>{nft?.name}  #{nft?.tokenId}</h3>
                            </div>
                            <form>
                                <div className="mb-6">
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Input price of nft</label>
                                    <input type="number" id="price" value={price} onChange={(e) => setPrice(Number(e.target.value))} name='price' placeholder='100' className=" border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3.5  dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" />
                                </div>
                                <button onClick={handleSubmit} type="button" disabled={isLoading} className=" border border-zinc-300 text-zinc-900 text-sm rounded-lg bg-indigo-500 focus:border-indigo-500 block w-full p-3.5  dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" >
                                    {
                                        isLoading ? "Processing...." : "Sell"
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' h-[320px] md:max-w-[280px] flex flex-col p-2 border border-zinc-700 hover:shadow-md shadow-zinc-800 rounded-2xl bg-zinc-800'>
                <div className='relative h-2/3 group '>
                    <div className='group-hover:opacity-100 opacity-0 transition-all delay-75 duration-200  absolute top-0 left-0 right-0 bottom-0 bg-black/20 z-10 flex justify-center items-center'>
                        <label htmlFor={nft?.tokenId?.toString()} className=" bg-[#6154f3] text-white rounded-xl px-4 py-2  ">List for sale</label>
                    </div>
                    <div className='absolute top-4 right-4 rounded-2xl z-10 bg-black'>
                        <p className=' text-xs font-semibold '>{nft?.owner} </p>
                    </div>
                    {
                        nft?.media_type?.toLowerCase() == "image"?
                        <img src={nft?.image_url} alt="" className=' relative block h-full rounded-2xl  w-full object-cover aspect-square' />
                        : <video src={nft?.image_url} className=' relative block h-full rounded-2xl  w-full object-cover aspect-square' />
                    }
                    </div>
                <div className=' flex-1 py-2 space-y-1.5 '>
                    <div className='text-sm'>
                        <p>{nft?.name} #{nft?.tokenId}</p>
                    </div>
                    <div className=' '>
                        <p className=' text-xs line-clamp-2 text-slate-200'>{nft?.description}</p>

                    </div>
                </div>
            </div>
        </div>
    )
}




export function NFTCardSeleton() {
    return (
        <div className='h-[320px] md:max-w-[280px] flex flex-col p-2 border border-zinc-700 hover:shadow-md shadow-zinc-800 rounded-2xl bg-zinc-800 animate-pulse'>
            <div className='relative h-2/3 group bg-zinc-500 rounded-2xl'></div>
            <div className='flex-1 py-2 flex justify-between flex-col'>
                <div className='px-2 h-3 bg-zinc-600  w-1/2 py-2 rounded-2xl'></div>
                <div className='px-2 h-3 bg-zinc-600  w-2/3 py-1 rounded-2xl'></div>
                <div className='px-4  flex justify-between items-center py-4 bg-zinc-900 rounded-xl'>
                    <div className='flex text-sm items-end justify-between w-full'>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}


export default NFTCard