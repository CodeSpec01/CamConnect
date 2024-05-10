import React, { useEffect, useState } from 'react'
import HomeTime from '@/components/HomeTime';
import MeetingTypeList from '@/components/MeetingTypeList';

const Home = () => {
    
    const UpcomingMeeting = true;
    
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

                        <HomeTime />
                    </div>
                </div>
            </div>

            <MeetingTypeList />
        </section>
    )
}

export default Home
