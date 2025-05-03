
'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import AddEdu from './components/AddEdu'
// import EditExp from './components/EditExp'

export default function Education({ education }) {
    return (
        <div className=' max-w-7xl mx-auto p-4 mt-2.5 bg-white/10 backdrop-blur-sm rounded-lg '>
            <div className='flex justify-between'>
                <h1>Education</h1>
                <div className='flex gap-2'>
                    {/* <EditExp /> */}
                    <AddEdu />
                </div>

            </div>
            {education?.length ?
                <>
                    {education?.map((edu, idx) => <div key={idx} className='space-y-2 mt-4 border-b border-white'>
                        <p className='text-lg text-gray-100 font-semibold'>{edu?.institute}</p>
                        <p className='text-sm text-gray-100 '><Badge variant="secondary" >{edu?.degree}
                        </Badge> | <Badge variant="secondary" >{edu?.fieldOfStudy}</Badge></p>
                        <p className='text-sm text-gray-100 '>{edu?.startDate} - {edu.endDate}</p>
                    </div>)}
                </> : <p className='text-md'>No education added yet.</p>
            }

            <div>
                {/* <p className='text-md'>Skills:</p> */}
                {/* <div className='space-x-2'>
                    {education?.skills?.map((skill, index) =>
                        <Badge variant="secondary" key={index} className={''} >{skill}</Badge>)}
                </div> */}
            </div>
        </div>
    )
}

