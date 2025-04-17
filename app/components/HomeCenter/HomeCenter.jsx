import React from 'react'
import PostInput from './components/PostInput'

export default async function HomeCenter() {
    return (
        <div className="overflow-y-auto h-screen border-l-2 border-r-2 border-gray-500 p-4">
            <div className="flex flex-col items-center  min-h-screen">
                {/* Post Input Box */}
                <PostInput />
            </div>
        </div>
    )
}
