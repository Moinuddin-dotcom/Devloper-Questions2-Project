'use client'
import { Button } from '@/components/ui/button';
import { DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function AddExpDrawer() {
    const { register, handleSubmit, reset } = useForm();
    const router = useRouter();

    const onSubmit = async (data) => {
        console.log(data)

        try {
            // const experience = {
            //     data
            // }
            const res = await axios.patch(`/api/update-profile-exp`, {experience: data});
            if (res.status === 200) {
                toast.success('Experience added successfully');
                router.refresh();
                reset()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <DrawerContent className={'min-h-[60vh] p-4 mt-2.5 bg-white/5 backdrop-blur-sm rounded-lg'}>
                {/* <div className='max-w-[90vw] border-4 mx-auto'> */}
                <div className="mx-auto w-full max-w-xl">
                    <DrawerHeader>
                        <DrawerTitle className={'text-white'}>Experience</DrawerTitle>
                        <DrawerDescription className={'text-gray-300'}>Set your experience.</DrawerDescription>
                    </DrawerHeader>

                    <div className="grid grid-cols-1 gap-4 p-4">
                        <Label htmlFor="location" className={'text-white'}>Title</Label>
                        <Input
                            id="title"
                            {...register('title')}
                            placeholder="Eg: Software Engineer"
                            className={'bg-white/10 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-gray-300'}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4 p-4">
                        <Label htmlFor="location" className={'text-white'}>Employment type</Label>
                        <Input
                            id="employment"
                            {...register('employment')}
                            placeholder="Eg: Full-time"
                            className={'bg-white/10 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-gray-300'}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4 p-4">
                        <Label htmlFor="location" className={'text-white'}>Company name</Label>
                        <Input
                            id="company"
                            {...register('company')}
                            placeholder="Eg: Google"
                            className={'bg-white/10 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-gray-300'}
                        />
                    </div>
                    <DrawerFooter>
                        <Button
                            onClick={handleSubmit(onSubmit)}
                        >Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </div>
    )
}
