'use client'

import { Call, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'

const MeetingSetup = () => {
  
  const call = useCall();
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);  
  const [timer, setTimer] = useState(false);

  setTimeout(() => {
    setTimer(true);
  }, 3000);

  useEffect(() => {

    if(isMicCamToggledOn) {
      
      call?.camera.disable();
      call?.microphone.disable();
      
    } else {

      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone])
  
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3'>

      <h1 className='text-2xl font-bold'>Setup</h1>

      { timer &&<VideoPreview />}
    </div>
  )
}

export default MeetingSetup
