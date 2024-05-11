'use client'

import { useState } from "react"
import HomeCard from "./HomeCard"
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";

const MeetingTypeList = () => {

    const { toast } = useToast();

    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: "",
        link: "",
    })
    const [callDetails, setCallDetails] = useState<Call>();

    const createMeeting = async () => {

        if (!user || !client) return;

        try {

            if(!values.dateTime) toast({
                title: "Please select a date and time"
            });

            const id = crypto.randomUUID();
            const call = client.call('default', id);

            if (!call) throw new Error("Failed to create call !");

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();

            const description = values.description || "Instant Meeting"

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    }
                }
            })

            setCallDetails(call);

            if (!values.description) router.push(`/meeting/${call.id}`);

            toast({title: "Meeting Created !"})
        } catch (error) {

            console.log(error)
            toast({
                title: "Failed to create meeting !",
            })
        }
    }

    const router = useRouter();

    const [meetingState, setMeetingState] = useState<'isJoiningMeeting' | 'isScheduleMeeting' | 'isInstantMeeting' | undefined>()

    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>

            <HomeCard
                color='bg-orange-1'
                img="/icons/add-meeting.svg"
                title="New Meeting"
                description="Start an instant meeting"
                handleclick={() => setMeetingState('isInstantMeeting')}
            />
            <HomeCard
                color='bg-blue-1'
                img="/icons/schedule.svg"
                title="Schedule Meeting"
                description="Plan your meeting"
                handleclick={() => setMeetingState('isScheduleMeeting')}
            />
            <HomeCard
                color='bg-purple-1'
                img="/icons/recordings.svg"
                title="View Recordings"
                description="Check out your recordings"
                handleclick={() => router.push('/recordings')}
            />
            <HomeCard
                color='bg-yellow-1'
                img="/icons/join-meeting.svg"
                title="Join Meeting"
                description="Join via invitation"
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