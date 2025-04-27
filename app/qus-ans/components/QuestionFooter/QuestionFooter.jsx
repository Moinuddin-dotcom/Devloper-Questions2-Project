

import {
    MoreVertical, Bookmark, Flag,
    // Edit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import LikeSection from "./components/LikeSection";
import DisLikeSection from "./components/DisLikeSection";
import DeleteSection from "./components/DeleteSection";
import CommentSection from "./components/CommentSection/CommentSection";
import EditSection from "./components/EditSection";




export default function QuestionBoxFooter({ card }) {

    return (
        <>
            <div className="flex items-center gap-0.5 md:space-x-4">
                {/* Upvote Button */}
                <LikeSection card={card} />

                {/* Downvote Button */}
                <DisLikeSection card={card} />

                {/* Comments */}
                <CommentSection card={card} />
            </div>

            <div>
                {/* Three-dot Dropdown Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="bg-white border text-gray-900 hover:text-gray-100">
                            <MoreVertical className="w-5 h-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white text-black p-2 rounded-lg shadow-md">
                        {/* Edit */}
                        <EditSection id={card._id} card={card} />
                        {/* Delete btn */}
                        <DeleteSection id={card._id} card={card} />
                        <DropdownMenuItem className="flex items-center space-x-2 hover:bg-gray-100 p-2 cursor-pointer">
                            <Bookmark className="w-4 h-4" />
                            <span>Bookmark</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center space-x-2 hover:bg-gray-100 p-2 cursor-pointer text-red-500">
                            <Flag className="w-4 h-4" />
                            <span>Report</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}
