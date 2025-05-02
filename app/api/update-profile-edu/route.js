import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function PATCH(req) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        const { education } = await req.json()
        const email = session.user.email.toLowerCase()
        const collection = await dbConnect(collectionNameObj.userCollection)
        const currentUser = await collection.findOne({ email })
        if (!currentUser) return NextResponse.json({ message: 'User not found' }, { status: 404 })
        const updateUserProfile = {
            $set: {
                education
            }
        }

        const updateUser = await collection.findOneAndUpdate(
            { email },
            updateUserProfile,
            { returnDocument: 'after' }
        )
        return NextResponse.json({ message: 'Education added successfully', user: updateUser.value }, { status: 200 })
    } catch (error) {
        console.error('Error adding experience:', error.message);
        return NextResponse.json({ message: 'Error adding education', error: error.message }, { status: 500 });
    }
}