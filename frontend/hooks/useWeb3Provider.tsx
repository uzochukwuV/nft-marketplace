"use client"
import { BrowserProvider, ethers, JsonRpcSigner, Network } from "ethers"
import { useCallback, useEffect, useState } from "react";


export interface IWeb3State {
    address: string | null;
    currentChain: number | null;
    signer: JsonRpcSigner | null;
    provider: BrowserProvider | null;
    isAuthenticated: boolean;
}

const sepolia = new Network("sepolia", 11155111)

const useWeb3Provider = () => {
    const initialWeb3State = {
        address: null,
        currentChain: null,
        signer: null,
        provider: null,
        isAuthenticated: false,
    };

    const [state, setState] = useState<IWeb3State>(initialWeb3State);

    const connect = useCallback(async () => {
        if (state.isAuthenticated) return;


        try {
            const { ethereum } = window as any;

            if (!ethereum) {
                console.log("no ethereum provider")
            }

            const provider = new ethers.BrowserProvider(ethereum, sepolia);

            const accounts: string[] = await provider.send("eth_requestAccounts", []);

            if (accounts.length > 0) {
                const signer = await provider.getSigner();
                const chain = Number((await provider.getNetwork()).chainId);

                setState({
                    ...state,
                    address: accounts[0],
                    signer,
                    currentChain: chain,
                    provider,
                    isAuthenticated: true,
                });

                localStorage.setItem("isAuthenticated", "true");
            }
        } catch (error) {
            console.error(error)
        }
    }, [state])


    const disconnect = () => {
        setState(initialWeb3State);
        localStorage.removeItem("isAuthenticated");
    };


    // automatically connects wallet if already connected before
    useEffect(() => {
        if (typeof window === "undefined") return; // Ensure it's running in the browser
    
        const isAuthenticated = localStorage.getItem("isAuthenticated");
    
        if (isAuthenticated === "true" && !state.isAuthenticated) {
            connect();
        }
    }, [connect, state.isAuthenticated]);

    useEffect(() => {
        if (typeof window === "undefined") return;
    
        const handleAccountsChanged = (accounts: string[]) => {
            if (accounts.length > 0) {
                setState(prev => ({ ...prev, address: accounts[0] }));
            } else {
                // Optionally reset state if wallet disconnects
                setState(prev => ({ ...prev, address: "", isAuthenticated: false }));
                localStorage.removeItem("isAuthenticated");
            }
        };
    
        const handleChainChanged = (chainId: string) => {
            setState(prev => ({ ...prev, currentChain: Number(chainId) }));
        };
    
        // window.ethereum.on("accountsChanged", handleAccountsChanged);
        // window.ethereum.on("chainChanged", handleChainChanged); // 🔁 Use 'chainChanged', not 'networkChanged'
    
        return () => {
            // window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
            // window.ethereum.removeListener("chainChanged", handleChainChanged);
        };
    }, []);
    


    return {
        state,
        connect,
        disconnect
    }

}

export default useWeb3Provider;