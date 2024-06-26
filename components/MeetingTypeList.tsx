'use client'

import { useState } from "react"
import HomeCard from "./HomeCard"
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import ReactDatePicker from 'react-datepicker';
import { Input } from "@/components/ui/input"

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
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

    const createMeeting = async () => {

        if (!user || !client) return;

        try {

            if (!values.dateTime) toast({
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

            console.log(description)

            toast({ title: "Meeting Created !" })

        } catch (error) {

            console.log(error)
            toast({
                title: "Failed to create meeting !",
            })
        }
    }

    const joinMeeting = async (id: string) => {

        if (!user || !client) return;

        try {

            const meetingId = id.startsWith(`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/`) ? id.replace(`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/`, '') : id

            const call = client.call('default', meetingId);

            if (!call) throw new Error("Something went wrong, please try again later");

            await call.get();

            router.push(`/meeting/${meetingId}`);

            toast({ title: "Meeting Joined !" })

        } catch (error) {

            console.log(error)

            toast({
                title: "Failed to join meeting. Please check the link !",
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
                color='bg-green-1'
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


            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState === "isScheduleMeeting"}
                    onClose={() => setMeetingState(undefined)}
                    title="Schedule a Meeting"
                    handleClick={async () => {
                        await createMeeting()
                        setValues({
                            dateTime: new Date(),
                            description: "",
                            link: "",
                        })
                    }}
                >
                    <div className="flex flex-col gap-2.5">

                        <label className="text-base leading-[22px] text-sky-1">
                            Add a description
                        </label>

                        <Textarea
                            className="border-none bg-dark-1 focus-visible:ring-0 focus-visible:ring-offset-0 "
                            onChange={(e) => {
                                setValues({ ...values, description: e.target.value })
                            }}
                            placeholder="Description is required !"
                        />
                    </div>

                    <div className="flex w-full flex-col gap-2.5">

                        <label className="text-base leading-[22px] text-sky-1 ">

                            Select Date and Time
                        </label>

                        <ReactDatePicker
                            selected={values.dateTime}
                            onChange={(date) => setValues({ ...values, dateTime: date! })}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="w-full rounded bg-dark-1 p-2 focus:outline-none"
                        />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState === "isScheduleMeeting"}
                    onClose={() => setMeetingState(undefined)}
                    title="Meeting Scheduled"
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink)
                        toast({ title: "Link Copied" })
                        setTimeout(() => {
                            setValues({
                                dateTime: new Date(),
                                description: "",
                                link: "",
                            })
                        }, 3000);
                    }}
                    image="/icons/checked.svg"
                    buttonIcon="/icons/copy.svg"
                    buttonText="Copy Meeting"
                />
            )}

            <MeetingModal
                isOpen={meetingState === "isInstantMeeting"}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />

            <MeetingModal
                isOpen={meetingState === "isJoiningMeeting"}
                onClose={() => setMeetingState(undefined)}
                title="Join a Meeting"
                className="text-center"
                buttonText="Join Meeting"
                handleClick={() => joinMeeting(values.link)}
            >

                <Input 
                    placeholder="Enter meeting Link"
                    className="border-none bg-dark-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                    onChange={(e) => setValues({...values, link: e.target.value})}
                />

                <span className="text-base leading-[22px] text-sky-1">OR</span>

                <Input 
                    placeholder="Enter meeting ID"
                    className="border-none bg-dark-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                    onChange={(e) => setValues({...values, link: e.target.value})}
                />
            </MeetingModal>
        </section>
    )
}

export default MeetingTypeList
