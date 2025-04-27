'use client'
import { Button } from '@/components/ui/button'
import { ArrowLeftFromLine } from 'lucide-react'
import Link from 'next/link'
import { TypeAnimation } from 'react-type-animation';

export default function ProfileNav({ myProfileData }) {
    const { name, email } = myProfileData || {}
    return (
        <>
            <div className='hidden md:flex'>
                <TypeAnimation
                    sequence={[
                        `Hey, Welcome! ${name}`,
                        2000, // Wait 2s before moving to the next message
                        `You are logged in as ${email}`,
                        2000,
                        'Explore your profile',
                        1000,
                        'Update your cover photo',
                        1000,
                        'Share your portfolio',
                        1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ fontSize: '1.5em', display: 'inline-block', fontWeight: 'bold' }}
                    repeat={Infinity}
                />
            </div>

            <div className=''>
                <Link href={'/'}>
                    <Button className={'bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900 hover:bg-gradient-to-bl focus:ring-red-100 dark:focus:ring-red-400 cursor-pointer'}>
                        <ArrowLeftFromLine />
                        Return to Home Page
                    </Button>
                </Link>
            </div>
        </>
    )
}
