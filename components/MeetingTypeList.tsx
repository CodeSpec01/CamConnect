'use client'

import { useState } from "react"
import HomeCard from "./HomeCard"
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";

const MeetingTypeList = () => {

    const createMeeting = () => {}
    
    const router = useRouter();
    
    const [meetingState, setMeetingState] = useState<'isJoiningMeeting' | 'isScheduleMeeting' | 'isInstantMeeting' | undefined>()

    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>

            <HomeCard
                color='bg-orange-1'
                img = "/icons/add-meeting.svg"
                title = "New Meeting"
                description = "Start an instant meeting"
                handleclick={() => setMeetingState('isInstantMeeting')}
            />
            <HomeCard
                color='bg-blue-1'
                img = "/icons/schedule.svg"
                title = "Schedule Meeting"
                description = "Plan your meeting"
                handleclick={() => setMeetingState('isScheduleMeeting')}
            />
            <HomeCard
                color='bg-purple-1'
                img = "/icons/recordings.svg"
                title = "View Recordings"
                description = "Check out your recordings"
                handleclick={() => router.push('/recordings')}
            />
            <HomeCard
                color='bg-yellow-1'
                img = "/icons/join-meeting.svg"
                title = "Join Meeting"
                description = "Join via invitation"
                handleclick={() => setMeetingState('isJoiningMeeting')}
            />

            <MeetingModal 
                isOpen={meetingState === "isInstantMeeting"}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="StartMeeting"
                handleClick={createMeeting}
            />
        </section>
    )
}

export default MeetingTypeList
