import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import dbConnect, { collectionNameObj } from '@/lib/dbConnect';
import { NextResponse } from 'next/server';

export async function PATCH(request) {
    try {
        const session = await getServerSession(authOptions);
        console.log(session, 'session from update profile');
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }


        const { experience } = await request.json();


        const collection = await dbConnect(collectionNameObj.userCollection);
        const email = session.user.email.toLowerCase();

        const currentUser = await collection.findOne({ email });
        if (!currentUser) {
            console.log(`User not found for email: ${email}`);
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const updateUserProfile = {
            $set: {
                experience
            },
        };

        const updatedUser = await collection.findOneAndUpdate(
            { email },
            updateUserProfile,
            { returnDocument: 'after' }
        );

        // if (!updatedUser.value) {
        //   console.log(`Update failed for email: ${email}`);
        //   return NextResponse.json({ message: 'Value User not found' }, { status: 404 });
        // }

        return NextResponse.json({ message: 'Experience added successfully', user: updatedUser.value }, { status: 200 });
    } catch (error) {
        console.error('Error adding experience:', error.message);
        return NextResponse.json({ message: 'Error adding experience', error: error.message }, { status: 500 });
    }
}