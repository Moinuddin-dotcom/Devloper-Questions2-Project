import axios from 'axios'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import ProfileHead from './components/ProfileHead'

import ProfileNav from './components/ProfileNav'
import Feature from './components/Feature'
import MyPost from './components/MyPost'
import Experience from './components/Experience'


const fetchMyProfile = async () => {
    try {
        const cookieHeader = headers().get('cookie') || ''

        const { data: userData } = await axios.get(`${process.env.NEXTAUTH_URL}/api/my-profile`, {
            headers: {
                Cookie: cookieHeader ? `next-auth.session-token=${cookieHeader}` : ''
            }
        })
        // console.log("userData: ----UI-->", userData)
        return userData || null
    } catch (error) {
        console.error("Error fetching user data:", error)
        return null
    }
}


export default async function MyProfile() {
    const myProfileData = await fetchMyProfile()
    if (!myProfileData || myProfileData.message === "Unauthorized access") {
        redirect('/login')
    }
    return (
        <div className="">

            <div className='flex justify-between items-center p-4 border-b-2 border-gray-500'>
                {/* ProfileNav */}
                <ProfileNav myProfileData={myProfileData} />
            </div>

            {/* Profile general intro name image */}
            <ProfileHead myProfileData={myProfileData} />
            {/* Feature */}
            <Feature />

            {/* MyPost */}
            <MyPost />
            {/* Experience */}
            <Experience />
        </div>
    )
}
