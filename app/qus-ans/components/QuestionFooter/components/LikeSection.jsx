"use client";

import { Button } from "@/components/ui/button";
import { PiArrowFatUpBold, PiArrowFatUpFill } from "react-icons/pi";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export default function LikeSection({ card }) {
    const session = useSession()
    const postId = card?._id
    const [likeCount, setLikeCount] = useState(card?.likes?.length || 0);
    const [hashLikeCount, setHashLikeCount] = useState(false);


    // fetching questionLike data
    const fetchQusData = async () => {
        try {
            const { data } = await axios(`/api/single-qus/${postId}`);
            setLikeCount(data?.likes?.length || 0);
            setHashLikeCount(data?.likes?.includes(session?.data?.user?.email));
        } catch (error) {
            console.error("Error fetching questionLike data:", error);
        }
    }
    // Like/Dislike Functionality
    const updateLike = async () => {
        try {
            const userEmail = session?.data?.user?.email;
            if (!userEmail) return;

            const response = await axios.patch(`/api/single-qus/${postId}/upvote`, {
                user: userEmail,
            });

            console.log("Like updated:", response.data);
            // Refresh the likes count in UI 
            await fetchQusData()
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };

    useEffect(() => {
        setHashLikeCount(card?.likes?.includes(session?.data?.user?.email || "") || false);
    }, [card, session]);
    return (
        <>
            <Button
                onClick={updateLike}
                className={`flex items-center sm:space-x-1 border 
                        ${hashLikeCount ? "bg-blue-400" : "bg-white hover:bg-white"} 
                    ${hashLikeCount ? "text-white" : "text-gray-900 hover:text-blue-500"}`}>
                {hashLikeCount ? <PiArrowFatUpFill className="text-white" /> : <PiArrowFatUpBold />}
                <span className="flex justify-center items-center"><span className="font-semibold hidden md:flex">Upvote</span><span>({likeCount})</span> </span>
            </Button>
        </>
    )
}
