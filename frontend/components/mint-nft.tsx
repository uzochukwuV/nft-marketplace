"use client"

import { IWeb3Context, useWeb3Context } from '@/context/web3Context';
import useContract from '@/hooks/useReadContract'
import React, { useState } from 'react'

function MintNFT() {
    const [isLoading, setLoading] = useState<boolean>(false);
    const { state } = useWeb3Context() as IWeb3Context;
    const contract = useContract({ contracts: "BaseNft" });


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        let data = new FormData(e.currentTarget)
        console.log(data)

        try {
            const response = await fetch('/api/mint', {
                method: 'POST',
                body:data
            });

            if (!response.ok) {
                console.error("Failed to upload data")
            }
            const ipfsData = await response.json()
            console.log(ipfsData) 
            console.log(state.address)

            const transaction = await contract?.safeMint(state.address, ipfsData.jsonurl);
            console.log(transaction)
            e.currentTarget.reset()
        } catch (error) {
            console.error(error)
        } finally {
            
            setLoading(false)
        }

    }
    return (
        <div className=' relative antialiased text-pretty px-12'>
            {
                isLoading ? <div id='loading-spinner' className=' invisible opacity-0 absolute  top-0 z-10 left-0 right-0 bottom-0 '>
            
                <div className=' flex justify-center items-center h-full'>
                    <div className='  w-48 h-48 flex justify-center items-center bg-white rounded-2xl'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"/></svg>
                    </div>
                </div>
            </div> : <div>

            </div>
            }
            <section className='relative py-16 h-[90vh] px-22 rounded-3xl bg-black/20 flex flex-col '>
                <div className=''>
                    <h1 className=' text-4xl font-semibold'>Create an nft</h1>
                    <p className=' text-slate-300'>Once your item is minted you will not be able to change any of its information.</p>
                </div>
                <form method='POST' onSubmit={handleSubmit} className=' flex-1 flex gap-16'>
                    <div className="flex-1 h-full">

                        <div className=' h-full w-full  flex items-center justify-center '>
                            <div className="flex items-center  justify-center w-full ">
                                <label htmlFor="dropzone-file" className="flex h-[400px] flex-col items-center justify-center w-full border-2 border-zinc-300 border-dashed rounded-lg cursor-pointer bg-zinc-50 dark:hover:bg-zinc-800 dark:bg-zinc-600 hover:bg-zinc-100 dark:border-zinc-600 dark:hover:border-zinc-500 dark:hover:bg-zinc-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-zinc-500 dark:text-zinc-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input required id="dropzone-file" type="file" name='file' className="hidden" />
                                </label>
                            </div>
                        </div>

                    </div>
                    <div className="flex-1">
                        <div className="mb-6">
                            <label htmlFor="nft-name" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Name</label>
                            <input type="text" required id="nft-name" name='name' className=" border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3.5  dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="nft-description" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Description</label>
                            <input type="text" required id="nft-description" name='description' className=" border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3.5  dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="nft-owner" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Owner name</label>
                            <input type="text" id="nft-owner" name='owner' className=" border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3.5  dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" />
                        </div>

                        <div className="mb-6">
                        <label htmlFor="media-type" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">Select an option</label>
                            <select id="media-type" name='mediaType' className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose a Media Type</option>
                                <option className=' px-4 py-2' value="Image">Image</option>
                                <option value="Video">Video</option>
                                <option value="Audio">Audio</option>
                                
                            </select>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="extenal-link" className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white">External link</label>
                            <input type="text" id="external-link" name='external-link' className=" border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3.5  dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" />
                        </div>

                        <div className="mb-6">
                            <button type="submit" disabled={isLoading} className=" border border-zinc-300 text-zinc-900 text-sm rounded-lg bg-indigo-500 focus:border-indigo-500 block w-full p-3.5  dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" >
                                {
                                    isLoading ? "Submit...." : "Submit"
                                }
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default MintNFT