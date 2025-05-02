'use client'
import { Button } from "@/components/ui/button";
import {
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import profilePic from "@/public/assets/profile-pic.png"
import RichTextEiditor from '@/app/components/rich-text-eiditor/index'

export default function DrawerContentPage() {
    const { data: session } = useSession();
    const router = useRouter()
    const [selectedPostType, setSelectedPostType] = useState(null)
    const [editorContent, setEditorContent] = useState("");
    const [imageContent, setImageContent] = useState([]);

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log(data);

            const userQuery = {
                name: session?.user?.name,
                email: session?.user?.email,
                image: session?.user?.image,
                content: editorContent,
                contentImage: imageContent,
                postType: data.postType,
                postedAt: new Date(),
                comments: [],
                likes: [],
                dislikes: [],
            };
            console.log(userQuery);

            const apiEndpoint = data.postType === 'blog' ? `/api/blog` : `/api/question`;

            const { data: dataPost } = await axios.post(apiEndpoint, userQuery)
            console.log(dataPost)
            if (dataPost.acknowledged === true) {
                reset()
                toast.success(`Your ${data?.postType} posted successfully`);
                router.push('/')
                router.refresh()
            } else {
                toast.error('Failed to post your content');
            }
        } catch (error) {
            console.error('Error posting:', error);
            toast.error('Something went wrong');
        }
    };

    return (
        // <DrawerContent className=" bg-gray-900 text-white rounded-lg overflow-hidden">
        <DrawerContent className=" bg-white/5 backdrop-blur-sm text-white rounded-lg overflow-hidden">
            <div className="overflow-y-auto max-h-[75vh] px-2">
                <DrawerHeader>
                    <DrawerTitle className="text-lg text-white text-center font-semibold">Create a Post</DrawerTitle>
                    <DrawerDescription className="text-gray-400 text-center">
                        Write your blog or ask a question.
                    </DrawerDescription>
                </DrawerHeader>

                <div className="flex justify-center items-center space-x-3 p-4">
                    <Image
                        src={session?.user?.image || profilePic}
                        width={40}
                        height={40}
                        alt="User Profile"
                        className="rounded-full border border-blue-500"
                    />
                    <div>
                        <p className="font-medium text-white">{session?.user?.name}</p>
                    </div>
                </div>

                <div className="md:flex justify-center items-center pl-10 md:gap-10 space-y-2">
                    <label className="flex items-center space-x-2">
                        {/* <InteractiveHoverButton className=""> */}
                        <Button>
                            <input
                                type="radio"
                                value="blog"
                                className="accent-blue-500"
                                {...register("postType", { required: true })}
                                onChange={() => setSelectedPostType('blog')}
                            />
                            <span>📖 Make a Blog Post</span>
                        </Button>
                        {/* </InteractiveHoverButton> */}
                    </label>
                    <label className="flex items-center space-x-2">
                        {/* <InteractiveHoverButton className=""> */}
                        <Button>
                            <input
                                type="radio"
                                value="question"
                                className="accent-green-500"
                                {...register("postType", { required: true })}
                                onChange={() => setSelectedPostType('question')}
                            />
                            <span>❓ Ask a Question</span>
                        </Button>
                        {/* </InteractiveHoverButton> */}
                    </label>
                </div>

                <div>
                    <RichTextEiditor
                        setContent={setEditorContent}
                        setImageContent={(imageContent) =>
                            setImageContent(Array.isArray(imageContent) ? imageContent : [imageContent])
                        }
                    />
                </div>

            </div>
            <DrawerFooter className="px-4">
                {selectedPostType && (
                    <Button
                        className={` w-[200px] md:w-xl mx-auto py-2 rounded-lg cursor-pointer ${selectedPostType === 'blog' ? 'bg-black text-white border border-white' : 'bg-black text-white border border-white'}`}
                        onClick={handleSubmit(onSubmit)}
                    >
                        {selectedPostType === 'blog' ? 'Post Blog' : 'Ask Question'}
                    </Button>
                )}

                <DrawerClose asChild>
                    <Button variant={'outline'} className={'text-black w-[200px] md:w-xl mx-auto py-2 rounded-lg cursor-pointer'}>
                        Cancel
                    </Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    );
}