'use client'

import React from 'react'
import AddExp from './components/AddExp'
import { Badge } from '@/components/ui/badge'
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
                <p className='text-lg text-gray-100 font-semibold'>{experience?.title}</p>
                <p className='text-sm text-gray-100 '>{experience?.company} | {experience?.employment}</p>
                <p className='text-sm text-gray-100 '>{experience?.startDate} - {experience?.endDate}</p>
            </div>
            <div>
                <p className='text-md'>Skills:</p>
                <div className='space-x-2'>
                    {experience?.skills?.map((skill, index) =>
                        <Badge variant="secondary" key={index} className={''} >{skill}</Badge>)}
                </div>
            </div>
        </div>
    )
}
