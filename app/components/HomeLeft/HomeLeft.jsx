
import React from 'react'
import TopGroups from './components/TopGroups/TopGroups'
import ProfileSection from './components/ProfileSection/ProfileSection'

export default function HomeLeft() {
    return (
        <div className="hidden md:block sticky top-0 ">
            <div className='min-h-3/5 '>
                <TopGroups />
            </div>
            {/* <div className="divider divider-secondary"></div> */}
            <div className="profileAndLogout">
                <ProfileSection />
            </div>
        </div>
    )
}
