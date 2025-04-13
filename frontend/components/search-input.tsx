"use client"

import React from 'react'

function SearchInput() {
    return (
        <div className=" relative rounded-2xl bg-white/10 hover:backdrop-blur-3xl">
            <div className=' absolute bottom-[50%] left-2 translate-y-[50%]'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
            </div>
            <input type="text" className=' px-10  bg-transparent border-0 outline-0 max-w-[400px] w-full block h-[45px] ' />
        </div>
    )
}

export default SearchInput