'use client'

import Image from 'next/image'

interface HomeCardPropsTypes {
    color: string,
    img: string,
    title: string,
    description: string,
    handleclick: () => void,
}

const HomeCard = ({color, img, title, description, handleclick} : HomeCardPropsTypes) => {
    return (
        <div className={`${color} px-4 py-6 flex flex-col justify-between w-full lg:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer`} onClick={handleclick}>

            <div className="flex justify-center items-center glassmorphism size-12 rounded-[10px]">

                <Image src={img} alt={title} width={27} height={27} />
            </div>

            <div className="flex flex-col gap-2">

                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-lg font-normal">{description}</p>
            </div>
        </div>
    )
}

export default HomeCard
