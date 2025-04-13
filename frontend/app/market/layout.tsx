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

        <div className=" container3">
            <Web3ContextProvider>
                <header className="">
                    <div id="nav" className=" flex justify-between px-16 py-4 mb-4 font-medium ">
                        <div className=" md:flex md:gap-32  items-center w-full">
                            <div className=" flex justify-between w-full">
                                <div>
                                    Logo
                                </div>
                                <div className=" flex gap-4 md:hidden items-center">
                                    <ConnectButton />
                                    </div>
                            </div>
                            <div className=" w-full">
                                <div className=" flex gap-4 items-center md:text-xs">
                                    {/* <SearchInput /> */}
                                    <div className=" rounded-2xl px-4 py-1 hover:bg-white/10 hover:backdrop-blur-3xl">
                                        <Link href={"/market"} className=" hover:text-white text-xs md:text-base" >Explore</Link>
                                    </div>
                                    <div className=" rounded-2xl px-4 py-1 hover:bg-white/10 hover:backdrop-blur-3xl">
                                        <Link href={"/market/mint"} className=" hover:text-white text-xs md:text-base" >Mint</Link>
                                    </div>
                                    <div className=" rounded-2xl px-4 py-1 hover:bg-white/10 hover:backdrop-blur-3xl">
                                        <Link href={"/market/assets"} className=" hover:text-white text-xs md:text-base" >Assets</Link>
                                    </div>
                                    <div className=" rounded-2xl px-4 py-1 hover:bg-white/10 hover:backdrop-blur-3xl">
                                        <Link href={"/market/transactions"} className=" hover:text-white text-xs md:text-base" >Transactions</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:flex gap-4 items-center">
                            <ConnectButton />
                        </div>
                    </div>
                </header>
                {children}

            </Web3ContextProvider>
        </div>
    );
}