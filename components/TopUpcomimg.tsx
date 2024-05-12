'use client'

import { useGetCalls } from "@/hooks/useGetCalls"
import Loader from "./Loader";
import { Call } from "@stream-io/video-react-sdk";

const TopUpcomimg = () => {

    const { upcomingCalls, isLoading } = useGetCalls();
    console.log(upcomingCalls)
    upcomingCalls.reverse()
    const latestUpcoming = upcomingCalls[0];
    const todayDate = new Date().toLocaleDateString();
    const latestUpcomingDate = (latestUpcoming as Call)?.state.startsAt?.toLocaleDateString();
    const isToday = latestUpcomingDate === todayDate;
    const latestUpcomingTime = (latestUpcoming as Call)?.state.startsAt?.toLocaleTimeString('en-US', { hour12: true, timeStyle: 'short' })

    if (isLoading) return (

        <div className='glassmorphism max-w-[270px] rounded text-center text-base font-normal h-10 flex justify-start items-start'>
            
            <div className="absolute -inset-x-2 -inset-y-[47.5vh]">
            
                <Loader height={30} width={30}/>
            </div>
        </div>
    )

    return (
        <>
            <h2 className='glassmorphism max-w-[300px] rounded py-2 text-center text-base font-normal'>{isToday ? (
                `Upcoming Meeting today at:  ${latestUpcomingTime}`
            ) : (
                "No Upcoming Meeting Today"
            )}</h2>
        </>
    )
}

export default TopUpcomimg
