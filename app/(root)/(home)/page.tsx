import React, { useEffect, useState } from 'react'
import HomeTime from '@/components/HomeTime';
import MeetingTypeList from '@/components/MeetingTypeList';
import TopUpcomimg from '@/components/TopUpcomimg';

const Home = () => {

    const UpcomingMeeting = true;

    return (
        <section className='flex size-full flex-col gap-10'>

            <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>

                <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 max-lg:p-11 lg:p-11'>

                    <TopUpcomimg />

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
