'use client'

import { Suspense } from "react"
import SearchInputs from "./components/Search"


// Page component with Suspense boundary
export default function SearchSuspense() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-black">
            <Suspense fallback={<p className="text-white">Loading...</p>}>
                <SearchInputs />
            </Suspense>
        </div>
    )
}
