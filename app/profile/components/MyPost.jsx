'use client'

import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Mail, PlusIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { createElement, useEffect, useState } from 'react'

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'

import profileImage from '@/public/assets/profile-pic.png'
import Link from 'next/link'
import DrawerContentPage from '@/app/components/HomeCenter/components/DrawerContentPage'
import { Drawer, DrawerTrigger } from '@/components/ui/drawer'

const stripHtmlTags = (html) => {
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
}

const getFirstTenWords = (text) => {
    const words = text.trim().split(/\s+/)
    return words.slice(0, 20).join(' ') + (words.length > 20 ? '...' : '');
}





export default function MyPost() {
    const { data: session, status } = useSession();
    const [myPost, setMyPost] = useState([])


    // fetch all posts by email
    useEffect(() => {
        const fetchMyPost = async () => {
            if (status !== 'authenticated' || !session?.user?.email) return;
            try {
                const { data: myPostData } = await axios(`/api/single-blog/email/${session?.user?.email}`, { withCredentials: true })
                console.log("myPostData: ----UI-->", myPostData)
                setMyPost(myPostData)
            } catch (error) {
                console.error("Error fetching user data:", error)
                setMyPost([])
            }
        }

        fetchMyPost()
    }, [status, session?.user?.email])


    return (
        <>
            <Drawer>
                <div className=' max-w-7xl mx-auto p-4 mt-2.5 bg-white/10 backdrop-blur-sm rounded-lg '>
                    <div className='flex justify-between'>
                        <h1>My Post</h1>
                        <DrawerTrigger asChild>
                            <Button className='bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900 hover:bg-gradient-to-bl focus:ring-red-100 dark:focus:ring-red-400 cursor-pointer'>
                                <span className='text-sm flex justify-center items-center gap-1.5'>Create a Post <PlusIcon /> </span>
                            </Button>
                        </DrawerTrigger>
                    </div>

                    <div >
                        <Carousel className="max-w-6xl mx-auto mt-2.5">
                            <CarouselContent className="-ml-1">
                                {myPost.slice(0, 4).map((post, index) => {
                                    const plainText = stripHtmlTags(post.content)
                                    const firstTenWords = getFirstTenWords(plainText)
                                    return (
                                        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="flex aspect-square">
                                                        <div className='space-y-2'>
                                                            <div className='flex justify-start gap-2'>
                                                                <div className='Image'>
                                                                    <Image
                                                                        src={post.image || profileImage}
                                                                        alt={post.name}
                                                                        width={45}
                                                                        height={45}
                                                                        className='rounded-full' />
                                                                </div>
                                                                <div className="userInfo">
                                                                    <h1 className='text-lg font-semibold'>{post.name}</h1>
                                                                    <p className='flex justify-center items-center text-gray-500 text-sm gap-1'><Mail className='w-5 h-5 bg-red-500 text-white rounded-sm' /> {post.email}</p>
                                                                </div>
                                                            </div>
                                                            <div className="contentimage">
                                                                <div className='flex justify-start items-center'>
                                                                    {/* <span>💻</span> */}
                                                                    <div className="text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: firstTenWords }} />
                                                                </div>
                                                                <div>
                                                                    {/* {(post.contentImage) && <Image
                                                                    src={post.contentImage[0]}
                                                                    alt={post.name}
                                                                    width={400}
                                                                    height={200}
                                                                    className='rounded-lg' />} */}
                                                                    {Array.isArray(post.contentImage) && post.contentImage.length > 0 && post.contentImage[0] ? (
                                                                        <Image
                                                                            src={post.contentImage[0]}
                                                                            alt={post.name || 'Content Image'}
                                                                            width={400}
                                                                            height={200}
                                                                            className="rounded-lg"
                                                                        />
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    )
                                })}
                            </CarouselContent>
                            <CarouselPrevious className={'text-black hover:text-black'} />
                            <CarouselNext className={'text-black hover:text-black'} />
                        </Carousel>
                        <Link href={'/all-posts'} className='flex justify-center items-center'>
                            <Button className='bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900 hover:bg-gradient-to-bl focus:ring-red-100 dark:focus:ring-red-400 cursor-pointer mt-2.5 px-30'>See All Posts</Button>
                        </Link>
                    </div>
                </div>
                {/* DrawerContentPage Here */}
                <DrawerContentPage />
            </Drawer>
        </>
    )
}
