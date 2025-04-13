import ConnectButton from "@/components/connect-button";
import SearchInput from "@/components/search-input";
import Web3ContextProvider from "@/context/web3Context";
import Link from "next/link";




export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div>
            <Web3ContextProvider>
                <header className="">
                    <div id="nav" className=" flex justify-between px-16 py-4 mb-4 font-medium ">
                        <div className=" flex gap-32  items-center">
                            <div>
                                Logo
                            </div>
                            <div >
                                <div className=" flex gap-4 items-center">
                                    <SearchInput />
                                    <div className=" rounded-2xl px-4 py-1 hover:bg-white/10 hover:backdrop-blur-3xl">
                                        <Link href={"/market"} className=" hover:text-white" >Explore</Link>
                                    </div>
                                    <div className=" rounded-2xl px-4 py-1 hover:bg-white/10 hover:backdrop-blur-3xl">
                                        <Link href={"/market/mint"} className=" hover:text-white" >Mint</Link>
                                    </div>
                                    <div className=" rounded-2xl px-4 py-1 hover:bg-white/10 hover:backdrop-blur-3xl">
                                        <Link href={"/market/assets"} className=" hover:text-white" >Your Assets</Link>
                                    </div>
                                    <div className=" rounded-2xl px-4 py-1 hover:bg-white/10 hover:backdrop-blur-3xl">
                                        <Link href={"/market/transactions"} className=" hover:text-white" >Transactions</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" flex gap-4 items-center">
                            <ConnectButton />
                        </div>
                    </div>
                </header>
                {children}

            </Web3ContextProvider>
        </div>
    );
}