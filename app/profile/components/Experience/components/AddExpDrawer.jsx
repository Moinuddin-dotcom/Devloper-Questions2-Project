'use client'
import { Button } from '@/components/ui/button';
import { DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios';
import { isAfter, isEqual, parse } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import CreatableSelect from 'react-select/creatable';


export default function AddExpDrawer() {
    const { register, handleSubmit, reset, getValues, setValue,control, formState: { errors } } = useForm();
    const router = useRouter();

    const components = {
        DropdownIndicator: null
    }



    const onSubmit = async (data) => {
        console.log(data)

        try {
            const res = await axios.patch(`/api/update-profile-exp`, { experience: data });
            if (res.status === 200) {
                toast.success('Experience added successfully');
                router.refresh();
                reset()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: '#d1d5db',
            color: 'white',
        }),
        input: (provided) => ({
            ...provided,
            color: 'white',
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#4b5563',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: 'white',
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: 'white',
            ':hover': {
                backgroundColor: '#6b7280',
                color: 'white',
            },
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#9ca3af',
        }),
    };


    return (
        <div>
            <DrawerContent className={'min-h-[60vh] p-4 mt-2.5 bg-white/5 backdrop-blur-sm rounded-lg overflow-y-hidden'}>
                {/* <div className='max-w-[90vw] border-4 mx-auto'> */}
                <div className="mx-auto w-full max-w-xl overflow-y-auto">
                    <DrawerHeader>
                        <DrawerTitle className={'text-white'}>Experience</DrawerTitle>
                        <DrawerDescription className={'text-gray-300'}>Set your experience.</DrawerDescription>
                    </DrawerHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-x-4 '>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-1.5'>
                            {/* Title */}
                            <div className="grid grid-cols-1 gap-4 p-4">
                                <Label htmlFor="location" className={'text-white'}>Title</Label>
                                <Input
                                    id="title"
                                    {...register('title')}
                                    placeholder="Eg: Software Engineer"
                                    className={'bg-white/10 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-gray-300'}
                                />
                            </div>
                            {/* Employment */}
                            <div className="grid grid-cols-1 gap-4 p-4">
                                <Label htmlFor="location" className={'text-white'}>Employment type</Label>
                                <Input
                                    id="employment"
                                    {...register('employment')}
                                    placeholder="Eg: Full-time"
                                    className={'bg-white/10 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-gray-300'}
                                />
                            </div>
                            {/* Company name */}
                            <div className="grid grid-cols-1 gap-4 p-4">
                                <Label htmlFor="location" className={'text-white'}>Company name</Label>
                                <Input
                                    id="company"
                                    {...register('company')}
                                    placeholder="Eg: Google"
                                    className={'bg-white/10 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-gray-300'}
                                />
                            </div>
                            {/* Skills name */}
                            <div className="grid grid-cols-1 gap-4 p-4">
                                <Label htmlFor="skills" className={'text-white'}>Skills</Label>
                                <Controller
                                    name='skills'
                                    control={control}
                                    rules={{ required: 'Atleast one Skills are required' }}
                                    render={({ field }) => (
                                        <CreatableSelect
                                            components={components}
                                            inputValue={field.inputValue}
                                            isClearable
                                            isMulti
                                            menuIsOpen={false}
                                            onChange={(newValue) => {
                                                field.onChange(newValue ? newValue.map(opt => opt.value) : [])
                                            }}
                                            onInputChange={(newInputValue) => {
                                                field.onChange(field.value || [])
                                                setValue('skillsInput', newInputValue)
                                            }}
                                            onKeyDown={(e) => {
                                                const inputValue = getValues('skillsInput' || '')
                                                if (!inputValue) return;
                                                if (e.key === "Enter" || e.key === "Tab") {
                                                    const currentValue = field.value || []
                                                    if (currentValue.includes(inputValue)) {
                                                        setValue('skillsInput', '')
                                                        e.preventDefault();
                                                        return;
                                                    }
                                                    field.onChange([...currentValue, inputValue])
                                                    setValue('skillsInput', '')
                                                    e.preventDefault();

                                                }
                                            }}
                                            placeholder="Type a skill and press Enter or Tab..."
                                            value={(field.value || []).map(skill => ({ label: skill, value: skill }))}
                                            styles={customStyles}
                                        />
                                    )}
                                />
                                {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-1.5 '>
                            {/* Start Date picker */}
                            <div className='grid grid-cols-1 gap-4 p-4'>
                                <Label htmlFor="startDate" className={'text-white'}>Start Date</Label>
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
                                <Label htmlFor="endDate" className={'text-white'}>End Date</Label>
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
