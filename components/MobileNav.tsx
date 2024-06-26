'use client'

import { Sheet, SheetClose, SheetContent, SheetTrigger, } from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"


const MobileNav = () => {

    const pathName = usePathname();
    return (

        <section className='w-full max-w-[264px]'>

            <Sheet>

                <SheetTrigger asChild>

                    <Image src='/icons/hamburger.svg' alt="hamburger icon" width={36} height={36} className="cursor-pointer sm:hidden" />
                </SheetTrigger>

                <SheetContent side='left' className="border-none bg-dark-2">

                    <Link href="/" className="flex items-center gap-1" >

                        <Image src='/icons/logo.svg' alt="CamConnect Logo" width={32} height={32} className="max-sm:size-10" />

                        <p className="text-[26px] font-extrabold text-white">Cam Connect</p>
                    </Link>

                    <div className="flex h-[cacl(100vh - 72px)] flex-col justify-between overflow-y-auto">

                        <SheetClose asChild>

                            <section className="flex h-full flex-col gap-6 pt-16">

                                <div className="flex flex-1 flex-col gap-6">

                                    {sidebarLinks.map(link => {


                                        const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`);

                                        return (

                                            <SheetClose asChild key={link.route}>

                                                <Link href={link.route} className={`${isActive ? 'bg-dark-3' : "bg-none"} flex gap-4 items-center p-4 rounded-lg w-full max-w-60`}>

                                                    <Image src={link.imageURL} alt={link.label} height={20} width={20} />

                                                    <p className='font-semibold'>{link.label}</p>
                                                </Link>
                                            </SheetClose>
                                        )
                                    })}
                                </div>
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav
