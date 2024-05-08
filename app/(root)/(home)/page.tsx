'use client'

import React, { useEffect, useState } from 'react'

const Home = () => {
    
    const [now, setNow] = useState(new Date());
    const dayData = (new Intl.DateTimeFormat('en-US', {dateStyle: 'full'})).format();
    const UpcomingMeeting = true;
    
    useEffect(() => {
        const secondsLeft = (60 - now.getSeconds()) * 1000;
        setTimeout(() => {
            setNow(new Date())
        }, secondsLeft);
    }, [now])

    return (
        <section className='flex size-full flex-col gap-10'>
            
            <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>

                <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 max-lg:p-11 lg:p-11'>

                    <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>{UpcomingMeeting ? (
                        "Upcoming Meeting at: 12:30"
                    ) : (
                        "No Upcoming Meeting"
                    )}</h2>

                    <div className="flex flex-col gap-2">

                        <h1 className='text-4xl font-extrabold lg:text-7xl'>{now.toLocaleTimeString('en-US', {hour12: true, timeStyle: 'short'})}</h1>

                        <p className="text-lg font-medium text-sky-1 lg:text-2xl">{dayData}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
