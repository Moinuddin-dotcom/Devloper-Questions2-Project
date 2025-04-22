import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function SearchInputs() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')

    // Update URL when searchTerm changes
    useEffect(() => {
        const params = new URLSearchParams(searchParams)
        if (searchTerm) {
            params.set('search', searchTerm)
        } else {
            params.delete('search')
        }
        router.push(`${pathName}?${params.toString()}`)
    }, [router, searchParams, searchTerm, pathName])

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }


    return (
        <div>
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="input input-bordered w-32 md:w-sm lg:w-96 text-black bg-white" />
        </div>
    )
}
