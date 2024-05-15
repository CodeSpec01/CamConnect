import React, { ReactNode } from 'react'
import { Dialog, DialogContent, } from "@/components/ui/dialog"
import Image from 'next/image'

interface MeetingModalPropsType {
    isOpen: boolean,
    onClose: () => void,
    title: string,
    className?: string,
    children?: ReactNode,
    handleClick?: () => void,
    buttonText?: string,
    image?: string,
    buttonIcon?: string,
}

const MeetingModal = ({ isOpen, onClose, title, className, children, handleClick, buttonText, image, buttonIcon }: MeetingModalPropsType) => {
    return (

        <Dialog open={isOpen} onOpenChange={onClose}>

            <DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-2 px-6 py-9'>

                <div className='flex flex-col gap-6'>

                    {image && (
                        <div className='flex justify-center'>
                            <Image src={image} alt='image' width={72} height={72} />
                        </div>
                    )}

                    <h1 className={`text-3xl font-bold leading-[42px] ${className}`}>{title}</h1>

                    {children}

                    <button className='bg-green-1 focus-visible:ring-0 focus-visible:ring-offset-0 py-2 rounded items-center justify-center flex gap-1' onClick={handleClick}>

                        {buttonIcon && (
                            <Image src={buttonIcon} alt='button icon' width={13} height={13} />
                        )} &nbsp;
                        
                        {buttonText || 'Schedule Meeting'}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MeetingModal
