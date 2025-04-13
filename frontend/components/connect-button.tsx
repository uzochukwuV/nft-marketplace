"use client"
import { useWeb3Context, IWeb3Context } from '@/context/web3Context'
import React, { useEffect } from 'react'


function ConnectButton() {
    const {state, connect, disconnect } = useWeb3Context() as IWeb3Context;
    
    return (
        <>
        <div className=" rounded-2xl px-4 py-1 bg-white/10 hover:backdrop-blur-3xl">
                                {
                                    state.isAuthenticated && <div>
                                        {state.address?.slice(0,5) }...{state.address?.slice(-5, state.address.length)}
                                    </div> 
                                }
                                </div>
        <div>
           {
            state.isAuthenticated ?
            <button id="" onClick={disconnect} className=" bg-[#6154f3] text-white rounded-3xl px-4 py-2  ">Disconnect</button>:
            <button id="" onClick={()=>connect()} className=" bg-[#6154f3] text-white rounded-3xl px-4 py-2  ">Connect</button>
           }
        </div>
        </>
    )
}

export default ConnectButton