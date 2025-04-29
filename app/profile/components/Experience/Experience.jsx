'use client'

import React from 'react'
import AddExp from './components/AddExp'
// import EditExp from './components/EditExp'

export default function Experience({ experience }) {
    return (
        <div className=' max-w-7xl mx-auto p-4 mt-2.5 bg-white/10 backdrop-blur-sm rounded-lg '>
            <div className='flex justify-between'>
                <h1>Experience</h1>
                <div className='flex gap-2'>
                    {/* <EditExp /> */}
                    <AddExp />
                </div>

            </div>
            <div className='space-y-2 mt-4'>
                <p className='text-lg text-gray-100 font-semibold'>Company: {experience?.company}</p>
                <p className='text-lg text-gray-100 font-semibold'>Title: {experience?.title}</p>
                <p className='text-lg text-gray-100 font-semibold'>Employment: {experience?.employment}</p>
            </div>
        </div>
    )
}
