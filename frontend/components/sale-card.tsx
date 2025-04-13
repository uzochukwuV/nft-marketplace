"use client"
import { ListedNFT } from '@/interface/nft'
import { IWeb3Context, useWeb3Context } from '@/context/web3Context';
import useContract, { market } from '@/hooks/useReadContract';
import React, { useRef, useState } from 'react'
import { formatEther, parseEther } from 'ethers';


export default function SaleCard({nft}:{nft:ListedNFT}) {
    const radioRef = useRef<HTMLInputElement | null>(null);
    const { state } = useWeb3Context() as IWeb3Context;
    const [isLoading, setLoading] = useState<boolean>(false);
   
    const market_contract = useContract({ contracts: "BaseMarket" });
    const coin_contract = useContract({ contracts: "BaseCoin" });

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const nft_trx = await coin_contract?.approve(market, parseEther(nft?.price!.toString()));
            await nft_trx?.wait();
            const transaction = await market_contract?.purchaseNFT(nft?.tokenId);
            await transaction.wait();
            
            setLoading(false)
            radioRef.current!.checked = false;
        } catch (error) {
            console.log(error)
        }

        // e.currentTarget.reset()
    }
  return (
    <div className=' '>
        {/*  */}
        <input type="radio" hidden ref={radioRef} id={nft?.tokenId?.toString()} name='list_for_sale' data-value="nft-card" value={nft?.tokenId} />
            <div className=' invisible opacity-0 transition-all delay-75 duration-150 absolute top-0 left-0 right-0 bottom-0 bg-black/20 z-20'>
                <div className="h-full w-full flex justify-center items-center">
                    <div className="max-w-[500px] w-full h-[500px] bg-zinc-800 rounded-2xl">
                        <div className=' h-full w-full p-4 pt-4'>
                            <div className=' flex justify-end'>
                                <div onClick={() => {
                                    radioRef.current!.checked = false;
                                    setLoading(false)
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
                                <div className="mb-6 bg-zinc-900 py-4 px-4 rounded-2xl text-white">
                                    Price : <span className=' font-bold '>{nft?.price} BaseCoin</span>
                                </div>
                                <button onClick={handleSubmit} type="button" disabled={isLoading} className=" border border-zinc-300 text-zinc-900 text-sm rounded-lg bg-indigo-500 focus:border-indigo-500 block w-full p-3.5  dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" >
                                    {
                                        isLoading ? "Processing...." : "Buy"
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        {/*  */}
        <div className=' h-[320px] md:max-w-[280px] flex flex-col p-2 border border-zinc-700 hover:shadow-md shadow-zinc-800 rounded-2xl bg-zinc-800'>
                  <div className='relative h-2/3 group '>
                    <div className='group-hover:opacity-100 opacity-0 transition-all delay-75 duration-200  absolute top-0 left-0 right-0 bottom-0 bg-black/20 z-10 flex justify-center items-center'>
                    <label htmlFor={nft?.tokenId?.toString()} className=" bg-[#6154f3] text-white rounded-xl px-4 py-2  ">Buy Now</label>
                    </div>
                    {
                        nft?.media_type?.toLowerCase() == "image"?
                        <img src={nft?.image_url} alt="" className=' relative block h-full rounded-2xl  w-full object-cover aspect-square' />
                        : <video src={nft?.image_url} className=' relative block h-full rounded-2xl  w-full object-cover aspect-square' />
                    }
                  </div>
                  <div className=' flex-1 py-2 flex justify-between  flex-col'>
                      <div className='px-2 text-sm'>
                        <p>{nft?.name}</p>
                      </div>
                      <div className=' px-4 py-1 flex justify-between items-center bg-zinc-900 rounded-xl'>
                          <div className='flex text-sm ite space-y-0.5 flex-col'>
                            <p className=' text-xs'>Sale</p>
                            <p className=''>Active</p>
                          </div>
                          <div className='flex space-y-0.5 items-end flex-col'>
                            <p className=' text-xs'>Price</p>
                            <p className=''>{formatEther(nft?.price?.toString()!).slice(0, 6)}1 BC</p>
                          </div>
                      </div>
                  </div>
              </div>
    </div>
  )
}
