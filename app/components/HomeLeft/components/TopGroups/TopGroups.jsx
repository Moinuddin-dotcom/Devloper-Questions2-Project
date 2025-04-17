import { Button } from '@/components/ui/button'
// import Link from 'next/link'

export default function TopGroups() {
    return (
        <div>
            {/* Map with this div */}
            <div className="group m-1 lg:m-4 ">
                {/* active this link */}
                {/* <Link> */}
                <Button className="cursor-pointer  flex items-center bg-black border border-red-500 text-white lg:px-8 xl:px-20 py-2 rounded-lg font-medium transition duration-300">
                    <div className="group1 p-2 ">Group name</div>
                </Button>
                {/* </Link> */}
            </div>
            {/* Remove this divs */}
            <div className="group m-1 lg:m-4 ">
                <Button className="cursor-pointer  flex items-center bg-black border border-red-500 text-white lg:px-8 xl:px-20 py-2 rounded-lg font-medium transition duration-300">
                    <div className="group1 p-2 ">Group name</div>
                </Button>
            </div>
            <div className="group m-1 lg:m-4 ">
                <Button className="cursor-pointer  flex items-center bg-black border border-red-500 text-white lg:px-8 xl:px-20 py-2 rounded-lg font-medium transition duration-300">
                    <div className="group1 p-2 ">Group name</div>
                </Button>
            </div>
            <div className="group m-1 lg:m-4 ">
                <Button className="cursor-pointer  flex items-center bg-black border border-red-500 text-white lg:px-8 xl:px-20 py-2 rounded-lg font-medium transition duration-300">
                    <div className="group1 p-2 ">Group name</div>
                </Button>
            </div>
            <div className="group m-1 lg:m-4 ">
                <Button className="cursor-pointer  flex items-center bg-black border border-red-500 text-white lg:px-8 xl:px-20 py-2 rounded-lg font-medium transition duration-300">
                    <div className="group1 p-2 ">Group name</div>
                </Button>
            </div>
            <div className="group m-1 lg:m-4 ">
                <Button className="cursor-pointer  flex items-center bg-black border border-red-500 text-white lg:px-8 xl:px-20 py-2 rounded-lg font-medium transition duration-300">
                    <div className="group1 p-2 ">Group name</div>
                </Button>
            </div>
            {/* Remove this divs */}
        </div>
    )
}
