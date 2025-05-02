'use client'
import { Button } from '@/components/ui/button';
import { DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios';
import { isAfter, isEqual, parse } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';


export default function AddEduDrawer() {
    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm();
    const router = useRouter();




    const onSubmit = async (data) => {
        console.log(data)

        try {
            const res = await axios.patch(`/api/update-profile-edu`, { education: data });
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
            <DrawerContent className={'min-h-[60vh] p-4 mt-2.5 bg-white/5 backdrop-blur-sm rounded-lg overflow-y-hidden'}>
                {/* <div className='max-w-[90vw] border-4 mx-auto'> */}
                <div className="mx-auto w-full max-w-xl overflow-y-auto">
                    <DrawerHeader>
                        <DrawerTitle className={'text-white'}>Education</DrawerTitle>
                        <DrawerDescription className={'text-gray-300'}>Set your education.</DrawerDescription>
                    </DrawerHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-x-4 '>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-1.5'>
                            {/* Institute name */}
                            <div className="grid grid-cols-1 gap-4 p-4">
                                <Label htmlFor="institute" className={'text-white'}>Institute Name</Label>
                                <Input
                                    id="institute"
                                    {...register('institute')}
                                    placeholder="Eg: Software Engineer University"
                                    className={'bg-white/10 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-gray-300'}
                                />
                            </div>
                            {/* Degree */}
                            <div className="grid grid-cols-1 gap-4 p-4">
                                <Label htmlFor="degree" className={'text-white'}>Degree</Label>
                                <Input
                                    id="degree"
                                    {...register('degree')}
                                    placeholder="Eg: BBA/BSc/BA"
                                    className={'bg-white/10 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-gray-300'}
                                />
                            </div>
                            {/* Field of study */}
                            <div className="grid grid-cols-1 gap-4 p-4">
                                <Label htmlFor="fieldOfStudy" className={'text-white'}>Field Of Study</Label>
                                <Input
                                    id="fieldOfStudy"
                                    {...register('fieldOfStudy')}
                                    placeholder="Eg: Business/Computer Science"
                                    className={'bg-white/10 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-gray-300'}
                                />
                            </div>
                            {/* Grade */}
                            <div className="grid grid-cols-1 gap-4 p-4">
                                <Label htmlFor="grade" className={'text-white'}>Grade</Label>
                                <Input
                                    id="grade"
                                    {...register('grade')}
                                    placeholder="Eg: 3.5/4.0"
                                    className={'bg-white/10 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-gray-300'}
                                />
                            </div>

                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-1.5 '>
                            {/* Start Date picker */}
                            <div className='grid grid-cols-1 gap-4 p-4'>
                                <Label htmlFor="startDate" className={'text-white'}>Start Date(month/date/year)</Label>
                                <Input
                                    id="startDate"
                                    type={'date'}
                                    className={'bg-white/10 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-gray-300 [appearance:auto]'}
                                    {...register('startDate', {
                                        required: 'Start date is required', validate: (value) => {
                                            if (!value) return 'Start date is required';
                                            const parsedDate = parse(value, 'yyyy-MM-dd', new Date());
                                            return !isNaN(parsedDate.getTime()) || 'Invalid date format';
                                        }
                                    })}

                                />
                            </div>
                            <div className='grid grid-cols-1 gap-4 p-4'>
                                {/* End Date picker */}
                                <Label htmlFor="endDate" className={'text-white'}>End Date(month/date/year)</Label>
                                <Input
                                    id="endDate"
                                    type={'date'}
                                    className={'bg-white/10 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-gray-300 '}
                                    {...register('endDate', {
                                        required: 'End date is required', validate: (value) => {
                                            if (!value) return true;
                                            const parsedEndDate = parse(value, 'yyyy-MM-dd', new Date());
                                            if (isNaN(parsedEndDate.getTime())) return 'Invalid end date';
                                            const startDateValue = getValues('startDate');
                                            if (!startDateValue) return null
                                            const parsedStartDate = parse(startDateValue, 'yyyy-MM-dd', new Date());
                                            return (
                                                (isAfter(parsedEndDate, parsedStartDate) || isEqual(parsedEndDate, parsedStartDate)) || 'End date must be after or equal to start date'
                                            )
                                        }
                                    })}
                                />
                                {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
                            </div>
                        </div>

                        <DrawerFooter>
                            <Button
                                type="submit"
                                className={'border border-gray-500'}
                            // onClick={handleSubmit(onSubmit)}
                            >Submit</Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </div>
            </DrawerContent>
        </div>
    )
}
