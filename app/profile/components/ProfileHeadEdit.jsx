'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

export default function ProfileHeadEdit({ myProfileData }) {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        defaultValues: {
            name: myProfileData?.name || '',
            bio: myProfileData?.bio || '',
            portfolio: myProfileData?.portfolio || '',
            location: myProfileData?.location || '',
            experience: myProfileData?.experience || '',
            about: myProfileData?.about || '',
            education: myProfileData?.education || '',
        },
    });

    // Watch bio for word count
    const bio = watch('bio');
    const wordCount = bio ? bio.split(/\s+/).filter(word => word.length > 0).length : 0;
    const about = watch('about');
    const aboutwordCount = about ? about.split(/\s+/).filter(word => word.length > 0).length : 0;

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.patch(`/api/update-profile`, data);
            if (response.status === 200) {
                toast.success('Profile updated successfully');
                router.refresh();
                reset()
            } else {
                toast.error(response.data.message || 'Error updating profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(error.response?.data?.message || 'Error updating profile');
        } finally {
            setLoading(false);
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className={'bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900 hover:bg-gradient-to-bl focus:ring-red-100 dark:focus:ring-red-400 cursor-pointer'}>
                    <Pencil className="w-4 h-4 mr-1" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className={"max-w-[100vw] md:max-w-[80vw] overflow-hidden"}>
                <div className="overflow-y-auto max-h-[75vh] px-2">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Update Your Profile Here</AlertDialogTitle>
                        <AlertDialogDescription>
                            Input your name, email, and other details to update your profile. You can also upload a new profile picture and cover photo.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Name */}
                            <div className="grid grid-cols-1 gap-4">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    {...register('name')}
                                    placeholder="Enter your name"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>
                            {/* Portfolio */}
                            <div className="grid grid-cols-1 gap-4">
                                <Label htmlFor="portfolio">Portfolio</Label>
                                <Input
                                    id="portfolio"
                                    {...register('portfolio', {
                                        pattern: {
                                            value: /^https?:\/\/[^\s$.?#].[^\s]*$/i,
                                            message: 'Portfolio must be a valid URL',
                                        },
                                    })}
                                    placeholder="Enter your portfolio URL (e.g., https://example.com)"
                                />
                                {errors.portfolio && <p className="text-red-500 text-sm">{errors.portfolio.message}</p>}
                            </div>
                            {/* Location */}
                            <div className="grid grid-cols-1 gap-4">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    {...register('location')}
                                    placeholder="Enter your location (e.g., Chattogram, Bangladesh)"
                                />
                            </div>
                            {/* Experience */}

                            <div className="grid grid-cols-1 gap-4">
                                <Label htmlFor="location">Experience</Label>
                                <Input
                                    id="experience"
                                    {...register('experience')}
                                    placeholder="Enter your experience "
                                />
                            </div>
                            {/* Education */}
                            <div className="grid grid-cols-1 gap-4">
                                <Label htmlFor="location">Education</Label>
                                <Input
                                    id="education"
                                    {...register('education')}
                                    placeholder="Enter your education "
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                {...register('bio', {
                                    validate: (value) => {
                                        const words = value ? value.split(/\s+/).filter(word => word.length > 0).length : 0;
                                        return words <= 20 || 'Bio must be 20 words or less';
                                    },
                                })}
                                placeholder="Tell us about yourself (20 words max)"
                                rows={4}
                            />
                            <p className="text-sm text-gray-500">{wordCount}/20 words</p>
                            {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
                        </div>


                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="bio">About Me</Label>
                            <Textarea
                                id="about"
                                {...register('about', {
                                    validate: (value) => {
                                        const words = value ? value.split(/\s+/).filter(word => word.length > 0).length : 0;
                                        return words <= 80 || 'Bio must be 80 words or less';
                                    },
                                })}
                                placeholder="Write about yourself (80 words max)"
                                rows={4}
                            />
                            <p className="text-sm text-gray-500">{aboutwordCount}/80 words</p>
                            {errors.about && <p className="text-red-500 text-sm">{errors.about.message}</p>}
                        </div>

                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button type="submit" disabled={loading}>
                                    {loading ? 'Updating...' : 'Continue'}
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}
