

import ListedAssets from '@/components/listed-assets'
import React from 'react'

function Market() {
  return (
    <div className=' antialiased text-pretty px-12'>
      <section className='relative  h-[90vh] rounded-3xl bg-black/20  '>
        <div className=' absolute top-0 left-0 right-0 bottom-0 bg-zinc-900 rounded-3xl  '></div>
        <div className=' relative h-full w-full p-16 flex gap-6 z-10'>
          <div className=' flex-1 flex justify-end items-center '>
            <video src="/test2.mp4" muted autoPlay loop className=' object-cover h-full rounded-3xl'></video>
          </div>
          <div className=' flex-1 h-full'>
            <div className=' p-8 flex justify-between h-full max-w-[520px] flex-col'>
              <div className=' space-y-4'>
                <p className=' font-semibold text-slate-400'>For Sale</p>
                <h2 className=' font-semibold text-4xl'>
                  PSG Silver Card Loyalty Program Pledge
                </h2>
                <p className=' text-sm text-slate-200 '>By Ownner</p>
              </div>

              <div>
                <p className=' text-slate-200 '>
                  Join the waitlist for the PSG Silver Card—a loyalty membership that unlocks exclusive drops, VIP rewards, and experiences money can’t buy. It starts with a Mystery Box featuring exclusive PSG x Jordan Wings apparel and a money-can’t-buy... Show more
                </p>
              </div>

              <div className=' flex justify-between items-center'>
                <button className=" bg-[#6154f3] text-white rounded-xl px-4 py-2  ">Buy Now</button>
                <p className=' text-xl font-semibold'>100 C</p>
              </div>
            </div>
          </div>
        </div>

      </section>
      <section className=' py-16'>  
          <ListedAssets />
            <div>
              {/*  */}
              {/* <div className=' h-[320px] max-w-[280px] flex flex-col p-2 border border-zinc-700 hover:shadow-md shadow-zinc-800 rounded-2xl bg-zinc-800'>
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
              </div> */}
            </div>
      </section>
    </div>
  )
}

export default Market