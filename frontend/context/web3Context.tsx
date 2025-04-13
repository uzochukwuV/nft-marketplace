"use client"
import { createContext, FC, ReactNode, useContext } from "react";
import useWeb3Provider, { IWeb3State } from "../hooks/useWeb3Provider";


export interface IWeb3Context {
    connect: () => Promise<void>;
    disconnect: () => void;
    state: IWeb3State;
  }

const Web3Context = createContext<IWeb3Context | null>(null);

const Web3ContextProvider = ({children}:React.PropsWithChildren)=>{
    const { connect, disconnect, state } = useWeb3Provider();


    return (
        <Web3Context.Provider
          value={{
            connect,
            disconnect,
            state,
          }}
        >
          {children}
        </Web3Context.Provider>
      );
}

export default Web3ContextProvider;

export const useWeb3Context = () => useContext(Web3Context);