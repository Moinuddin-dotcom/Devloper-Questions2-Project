import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import React from 'react'

export default function EditExp() {
    return (
        <div>
            <Button variant="outline" className={'bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900 hover:bg-gradient-to-bl focus:ring-red-100 dark:focus:ring-red-400 cursor-pointer'}>
                <Pencil className="w-4 h-4 mr-1" />
            </Button>
        </div>
    )
}
