'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import coverPhoto from '@/public/assets/profile-cover-photo.png'
import profilePicture from '@/public/assets/profile-pic.png'
import { Button } from '@/components/ui/button'
import { Bookmark, Pencil } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import ProfileHeadEdit from './ProfileHeadEdit'

export default function ProfileHead({ myProfileData }) {

    const { name, image, coverImage, bio, portfolio, location, about, education, experience } = myProfileData || {}
    const [uploading, setUploading] = useState(false)

    const router = useRouter()

    const handleImageUpload = async (e, type) => {
        const file = e.target.files[0]
        if (!file) return
        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('type', type)

        try {
            const res = await axios.post('api/upload-image', formData)
            if (res.status === 200) {
                router.refresh();
                toast.success(type === 'cover' ? 'Cover image uploaded successfully' : 'Profile image uploaded successfully');
            } else {
                toast.error(response.data.message || 'Error uploading image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error(error.response?.data?.message || 'Error uploading image');
        } finally {
            setUploading(false);
        }

    }


    return (
        <div className="rounded-b-lg shadow-lg p-0  pt-0 max-w-7xl mx-auto bg-white/10 backdrop-blur-sm px-4">

            {/* Cover photo Section */}
            <div className="relative w-full h-40 md:h-72 rounded-b-lg flex justify-between items-center border border-t-0 border-gray-500">
                <Image
                    src={coverImage || coverPhoto}
                    alt="cover photo"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    className='rounded-b-lg' />

                <div className='absolute top-2 right-2'>
                    <Button
                        variant={'outline'}
                        size={'sm'}
                        disabled={uploading}
                        className="bg-white/80 hover:bg-white text-black"
                        onClick={() => document.getElementById('cover-upload').click()}
                    >
                        <Pencil className="w-4 h-4 mr-1" />
                        {uploading ? '...' : 'Edit'}
                    </Button>
                    <input
                        id="cover-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, 'cover')}
                    />
                </div>
            </div>
            <div className='flex justify-between mt-4'>
                <div>
                    <div className='flex justify-between'>
                        {/* Profile Info Section */}
                        <div className=" flex items-center  space-x-6">
                            <div className='relative'>
                                <Image
                                    src={image || profilePicture}
                                    alt="Profile Picture"
                                    width={180}
                                    height={100}
                                    className="rounded-lg border-2 border-white"
                                />
                                <div className="absolute top-0 right-0">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={uploading}
                                        className="bg-white/80 hover:bg-white text-black rounded-lg"
                                        onClick={() => document.getElementById('profile-upload').click()}
                                    >
                                        <Pencil className="w-4 h-4 mr-1" />
                                        {uploading ? '...' : ''}
                                    </Button>
                                    <input
                                        id="profile-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleImageUpload(e, 'profile')}
                                    />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{name}</h2>
                                {/* Bio */}
                                <p className="text-sm text-white mt-1">
                                    {bio || 'No bio available'}
                                </p>
                                {/* Profile Info */}
                                <div className="">
                                    <a href={portfolio}><span className='mt-2 text-blue-400 underline'>{portfolio}</span> </a>
                                </div>
                                <div>
                                    {/* Location */}
                                    <p>📍 {location}</p>
                                </div>
                                <div>
                                    <p className=''>⚙️ {experience?.company}</p>
                                </div>
                                <div>
                                    {/* <p className=''>🎓 {education.map(edu=> `${edu.degree} in ${edu.fieldOfStudy}`).join(', ')}</p> */}
                                    <p className=''>🎓 {education[0]?.degree} in {education[0]?.fieldOfStudy}</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <Button
                                className={'bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900 hover:bg-gradient-to-bl focus:ring-red-100 dark:focus:ring-red-400 cursor-pointer '}> <Bookmark /></Button>
                            {/* Profile edit modal */}
                            <ProfileHeadEdit myProfileData={myProfileData} />
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-100">
                        {/* About me */}
                        <h1 className='text-center underline underline-offset-2'>About me</h1>
                        <div className="flex items-center space-x-1 mt-2">
                            <div>{about}</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
