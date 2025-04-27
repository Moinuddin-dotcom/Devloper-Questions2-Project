'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import coverPhoto from '@/public/assets/profile-cover-photo.png'
import profilePicture from '@/public/assets/profile-pic.png'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function ProfileHead({ myProfileData }) {
    const { name, image, coverImage } = myProfileData || {}
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
        <div className="rounded-lg shadow-lg p-0 md:p-3 pt-0 max-w-7xl mx-auto  ">
            {/* Cover photo Section */}
            <div className="relative w-full h-40 md:h-72 rounded-b-lg flex justify-between items-center border border-t-0 border-gray-500">
                <Image
                    src={coverImage || coverPhoto}
                    alt="cover photo"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    className='rounded-lg' />

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

            {/* Profile Info Section */}
            <div className=" flex items-center mt-6 space-x-6">
                <div className='relative'>
                    <Image
                        src={image || profilePicture}
                        alt="Profile Picture"
                        width={120}
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
                    <p className="text-sm text-gray-600 mt-1">
                        📘 Front-End Developer | I build fast and reliable websites
                    </p>
                    {/* Profile Info */}
                    <div className="mt-2 text-blue-600 underline">
                        <a href="https://moinuddin-portfolio.web.app/" target="_blank">Portfolio</a>
                    </div>
                </div>
            </div>

            {/* Footer Info */}
            <div className="mt-4 text-sm text-gray-100">
                {/* Location */}
                <p>📍 Chattogram, Bangladesh</p>
                {/* Experience & Study */}
                <div className="flex space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                        {/* <Image src="/robi-logo.png" alt="Robi" width={20} height={20} /> */}
                        <span>Robi Axiata Limited</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
