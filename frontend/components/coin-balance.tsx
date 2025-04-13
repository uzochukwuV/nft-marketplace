"use client"
import { IWeb3Context, useWeb3Context } from '@/context/web3Context';
import useContract from '@/hooks/useReadContract';
import { formatEther } from 'ethers';
import React, { useEffect, useState } from 'react'

function CoinBalance() {
    const contract = useContract({ contracts: "BaseCoin" });
    const [balance, setBalance] = useState<string>();
    const { state } = useWeb3Context() as IWeb3Context;
    useEffect(()=>{
        getBalance()
    },[state.isAuthenticated])

    const getBalance = async ()=>{
        const balance = await contract?.balanceOf(state.address);
        console.log(balance)
        setBalance(formatEther(balance!))
    }
  return (
    <div className=' text-xs'>{balance?.slice(0,8)} BaseCoin</div>
  )
}

export default CoinBalance