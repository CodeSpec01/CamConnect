'use client'

import React, { useEffect, useState } from 'react'

const HomeTime = () => {

    const [now, setNow] = useState(new Date());
    const dayData = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format();

    useEffect(() => {
        const secondsLeft = (60 - now.getSeconds()) * 1000;
        setTimeout(() => {
            setNow(new Date())
        }, secondsLeft);
    }, [now])

    return (
        <>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>{now.toLocaleTimeString('en-US', { hour12: true, timeStyle: 'short' })}</h1>

            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{dayData}</p>
        </>
    )
}

export default HomeTime
