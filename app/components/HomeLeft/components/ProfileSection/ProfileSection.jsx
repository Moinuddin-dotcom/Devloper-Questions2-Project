import Link from 'next/link'
import React from 'react'

export default function ProfileSection() {
    return (
        <div className='flex flex-col pt-10 px-3.5 gap-2.5 border-t-2 border-red-800'>
            <button className="btn">
                <Link href={'/profile'}>Profile</Link>
            </button>
            <button className="btn">Log Out</button>
        </div>
    )
}
