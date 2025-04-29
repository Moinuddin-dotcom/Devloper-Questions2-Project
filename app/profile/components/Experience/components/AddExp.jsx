import { Button } from '@/components/ui/button'
import { Drawer, DrawerTrigger } from '@/components/ui/drawer'
import { PlusIcon } from 'lucide-react'
import React from 'react'
import AddExpDrawer from './AddExpDrawer'

export default function AddExp() {
    return (
        <div>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button className='bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900 hover:bg-gradient-to-bl focus:ring-red-100 dark:focus:ring-red-400 cursor-pointer'>
                        <span className='text-sm flex justify-center items-center gap-1.5'><PlusIcon /> </span>
                    </Button>
                </DrawerTrigger>
                {/* AddExpDrawer */}
                <AddExpDrawer />
            </Drawer>
        </div>
    )
}
