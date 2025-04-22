'use client'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerTrigger } from '@/components/ui/drawer'
import { Bell, MessagesSquare } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import profilePic from '@/public/assets/profile-pic.png'
import DrawerContentPage from '@/app/components/HomeCenter/components/DrawerContentPage'
// import SearchInputs from './SearchFunctionality/components/Search'
import SearchSuspense from './SearchFunctionality/SearchSuspense'

export default function Navbar() {
    const { data: session, status } = useSession()
    console.log(session)
    const navLinks = <>
        <li className="lg:hidden"><Link href={'/'}>Home</Link></li>
        <li><Link href={'/qus-ans'}>Questions</Link></li>
    </>
    return (
        <div className="navbar lg:px-5 bg-black text-white shadow-sm sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-white text-black rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
                <Link href={'/'} className=" hidden lg:flex">
                    {/* <SparklesText text="DevQuestions" className="text-2xl" /> */}
                    <h1 className='text-2xl'> DevQuestions</h1>

                </Link>
                <ul className="menu menu-horizontal px-1 hidden lg:flex">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-center ">
                {/* Search bar */}
                {/* <SearchInputs /> */}
                <SearchSuspense />
            </div>
            <div className="navbar-end">
                {status === "authenticated" ? <>
                    <Drawer>
                        <div className="flex justify-center items-center gap-1.5">

                            <div className="message btn btn-sm rounded-full bg-black border-none text-white hidden md:flex">
                                <MessagesSquare />
                            </div>
                            <div className="notification btn btn-sm rounded-full bg-black border-none text-white hidden lg:flex">
                                <Bell />
                            </div>

                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <Image
                                            src={session?.user?.image || profilePic}
                                            width={40}
                                            height={40}
                                            alt="Profile image" />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-white text-black rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    <li>
                                        <a> Profile</a>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li><a>Message</a></li>
                                    <li><a>Notification</a></li>

                                    <li>
                                        <button
                                            onClick={() => signOut()}
                                            className="btn btn-sm md:btn-md bg-red-400">
                                            Log out
                                        </button>
                                    </li>
                                </ul>
                            </div>



                            <DrawerTrigger asChild>
                                <Button className="cursor-pointer  flex items-center bg-black border border-red-500 text-white md:px-5 py-2 rounded-lg font-medium transition duration-300">
                                    <span className="hidden md:flex">Add Question</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </Button>
                            </DrawerTrigger>
                            {/* <DrawerTrigger asChild>
                                <Button className=' cursor-pointer bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800'>Add Question</Button>
                            </DrawerTrigger> */}
                        </div>
                        {/* DrawerContentPage Here */}
                        <DrawerContentPage />
                    </Drawer>
                </> :
                    <>
                        <div className="flex gap-1.5">
                            <Link href={'/login'}>
                                <Button
                                    className=" cursor-pointer bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">Log In</Button>
                            </Link>
                        </div>
                    </>
                }
            </div>
        </div >
    )
}
