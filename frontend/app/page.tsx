"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Home() {
  const navigate = useRouter()
  return (
    <div id="container" className=" container3 font-[family-name:var(--font-geist-sans)] absolute top-0 left-0 right-0 bottom-0">
      <header className="">
       
        <div id="nav" className=" flex justify-between px-16 py-4 font-medium ">
          <div className=" flex gap-16  items-center">
            <div>
              Logo
            </div>
            <div >
              <div className="  gap-4 hidden md:flex">
                <div className=" rounded-2xl px-4 py-1 hover:bg-white/10 hover:backdrop-blur-3xl">Home</div>
                <div className=" rounded-2xl px-4 py-1 hover:bg-white/10 hover:backdrop-blur-3xl">Earn</div>
                <div className=" rounded-2xl px-4 py-1 hover:bg-white/10 hover:backdrop-blur-3xl">FAQ</div>
                <div className=" rounded-2xl px-4 py-1 hover:bg-white/10 hover:backdrop-blur-3xl">Contact</div>
              </div>
            </div>
          </div>
          <div className=" flex gap-4">
            <div className=" rounded-2xl px-4 py-1 hover:bg-white/10 hover:backdrop-blur-3xl">X</div>
            <div className=" rounded-2xl px-4 py-1 hover:bg-white/10 hover:backdrop-blur-3xl">D</div>
            <div>
              <div></div>
              <button onClick={()=>navigate.push("market")} id="" className=" bg-[#6154f3] text-white rounded-3xl px-4 py-2  ">Go to app</button>
            </div>
          </div>
        </div>
      </header>
      <section>
        <section id="hero" className=" pt-16 flex justify-center items-center flex-col gap-12">
          <div className=" text-center max-w-lg space-y-6" >
            <div className=" flex justify-center">
              <p className=" bg-white/10 rounded-xl px-4 py-2 text">Introducing: BaseMarket</p>
            </div>
            <div className=" space-y-4">
              <h1 className=" font-bold text-5xl">Mint, Buy, and Sell.</h1>
              <p className=" text-xl"> A decentralized ecosystem that empowers NFT traders and owners</p>
            </div>
          </div>
          <div className=" max-w-[800px] w-full md:flex gap-4 justify-between items-center">
                <div className=' mx-auto mb-6 h-[320px] max-w-[280px] flex flex-col p-2 border border-zinc-700 hover:shadow-md shadow-zinc-800 rounded-2xl bg-zinc-800'>
                  <div className='relative h-2/3 group '>
                    <div className='group-hover:opacity-100 opacity-0 transition-all delay-75 duration-200  absolute top-0 left-0 right-0 bottom-0 bg-black/20 z-10 flex justify-center items-center'>
                        <button className=" bg-[#6154f3] text-white rounded-xl px-4 py-2  ">Buy Now</button>
                    </div>
                    <img src="/test1.avif" alt="" className=' relative block h-full rounded-2xl  w-full object-cover aspect-square' />
                  </div>
                  <div className=' flex-1 py-2 flex justify-between  flex-col'>
                      <div className='px-2 text-sm'>
                        <p>Game of Thrones</p>
                      </div>
                      <div className=' px-4 py-1 flex justify-between items-center bg-zinc-900 rounded-xl'>
                          <div className='flex text-sm ite space-y-0.5 flex-col'>
                            <p className=' text-xs'>Sale</p>
                            <p className=''>Active</p>
                          </div>
                          <div className='flex space-y-0.5 items-end flex-col'>
                            <p className=' text-xs'>Price</p>
                            <p className=''>100 BC</p>
                          </div>
                      </div>
                  </div>
              </div> 
              <div className='mx-auto mb-6 h-[320px] max-w-[280px] flex flex-col p-2 border border-zinc-700 hover:shadow-md shadow-zinc-800 rounded-2xl bg-zinc-800'>
                  <div className='relative h-2/3 group '>
                    <div className='group-hover:opacity-100 opacity-0 transition-all delay-75 duration-200  absolute top-0 left-0 right-0 bottom-0 bg-black/20 z-10 flex justify-center items-center'>
                        <button className=" bg-[#6154f3] text-white rounded-xl px-4 py-2  ">Buy Now</button>
                    </div>
                    <video src="/test2.mp4" muted loop autoPlay className=' relative block h-full rounded-2xl  w-full object-cover aspect-square' />
                  </div>
                  <div className=' flex-1 py-2 flex justify-between  flex-col'>
                      <div className='px-2 text-sm'>
                        <p>Game of Thrones</p>
                      </div>
                      <div className=' px-4 py-1 flex justify-between items-center bg-zinc-900 rounded-xl'>
                          <div className='flex text-sm ite space-y-0.5 flex-col'>
                            <p className=' text-xs'>Sale</p>
                            <p className=''>Active</p>
                          </div>
                          <div className='flex space-y-0.5 items-end flex-col'>
                            <p className=' text-xs'>Price</p>
                            <p className=''>100 BC</p>
                          </div>
                      </div>
                  </div>
              </div> 

              <div className='mx-auto mb-6 h-[320px] max-w-[280px] flex flex-col p-2 border border-zinc-700 hover:shadow-md shadow-zinc-800 rounded-2xl bg-zinc-800'>
                  <div className='relative h-2/3 group '>
                    <div className='group-hover:opacity-100 opacity-0 transition-all delay-75 duration-200  absolute top-0 left-0 right-0 bottom-0 bg-black/20 z-10 flex justify-center items-center'>
                        <button className=" bg-[#6154f3] text-white rounded-xl px-4 py-2  ">Buy Now</button>
                    </div>
                    <img src="/test1.avif" alt="" className=' relative block h-full rounded-2xl  w-full object-cover aspect-square' />
                  </div>
                  <div className=' flex-1 py-2 flex justify-between  flex-col'>
                      <div className='px-2 text-sm'>
                        <p>Game of Thrones</p>
                      </div>
                      <div className=' px-4 py-1 flex justify-between items-center bg-zinc-900 rounded-xl'>
                          <div className='flex text-sm ite space-y-0.5 flex-col'>
                            <p className=' text-xs'>Sale</p>
                            <p className=''>Active</p>
                          </div>
                          <div className='flex space-y-0.5 items-end flex-col'>
                            <p className=' text-xs'>Price</p>
                            <p className=''>100 BC</p>
                          </div>
                      </div>
                  </div>
              </div> 
            
            
          </div>
        </section>
     </section>

    </div>
  );
}