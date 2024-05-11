'use client'

import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';


type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {

  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if(callingState != CallingState.JOINED) return <Loader />
  
  const CallLayout = () => {

    switch (layout) {

      case 'grid':
        return <PaginatedGridLayout />

      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition='left' />

      default:
        return <SpeakerLayout participantsBarPosition='right' />
    }
  }

  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 justify-center flex'>

      <div className='relative flex size-full items-center justify-center'>

        <div className='flex size-full max-w-[1000px] items-center'>

          <CallLayout />
        </div>

        <div className={`h-[calc(100vh-86px)] ml-2 bg-dark-2 p-4 rounded-lg ${showParticipants ? 'block' : 'hidden'}`}>

          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className='fixed bottom-0 flex w-[calc(100vw-1vw)] items-center justify-center gap-5 flex-wrap pb-5 box-border md:pb-10'>

        <CallControls />

        <DropdownMenu>

          <div className='flex items-center'>

            <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#202C37] px-4 py-2 hover:bg-[#4C535B]'>

              <LayoutList size={20} />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className='border-dark-2 bg-dark-2 text-white'>

            {['Grid', 'Speaker-Left', 'Speaker-right'].map((item, index) => (
              <div key={index}>

                <DropdownMenuItem className='cursor-pointer focus:bg-[#020203] focus:text-white' onClick={() => {
                  setLayout(item.toLocaleLowerCase() as CallLayoutType)
                }} >

                  {item}
                </DropdownMenuItem>

                <DropdownMenuSeparator className='bg-[#020203]' />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />

        <button onClick={() => setShowParticipants((prev) => !prev)} >

          <div className='cursor-pointer rounded-2xl bg-[#19232D] px-4 py-2 hover:bg-[#4C535B]'>

            <Users size={20} />
          </div>
        </button>

        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  )
}

export default MeetingRoom
