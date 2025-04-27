import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";


export async function POST(req) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        const formData = await req.formData()
        const file = formData.get('file')
        const type = formData.get('type')
        if (!file || !type) return NextResponse.json({ message: 'File and type are required' }, { status: 400 });

        // Convert file to buffer
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary

        const res = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME,
                    folder: `user_${session.user.email}`
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            )
            uploadStream.end(buffer);
        })

        // Connect to database
        const collection = await dbConnect(collectionNameObj.userCollection)

        // Update user profile
        const updateField = type === 'cover' ? { coverImage: res.secure_url } : { image: res.secure_url }
        const updatedUser = await collection.findOneAndUpdate(
            { email: session.user.email },
            { $set: updateField },
            { returnDocument: 'after' }
        );

        return NextResponse.json({ message: 'Image uploaded successfully', user: updatedUser.value }, { status: 200 });

    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json({ message: 'Error uploading image' }, { status: 500 });
    }
}