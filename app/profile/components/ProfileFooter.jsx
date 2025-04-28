import { Button } from '@/components/ui/button'
import React from 'react'

export default function ProfileFooter() {
    return (
        <div className='max-w-7xl mx-auto flex justify-end gap-2.5'>
            <Button
                className={'cursor-pointer bg-white text-black hover:text-white hover:border-white hover:border px-20'}>Bookmark</Button>
            <Button
                className={'cursor-pointer bg-white text-black hover:text-white hover:border-white hover:border px-20'}>Add Post</Button>
        </div>
    )
}
