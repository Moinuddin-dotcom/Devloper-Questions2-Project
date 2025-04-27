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

        const { name, bio, portfolio, location } = await request.json();

        // Validation
        if (bio && bio.split(/\s+/).filter(word => word.length > 0).length > 20) {
            return NextResponse.json({ message: 'Bio must be 20 words or less' }, { status: 400 });
        }
        if (portfolio && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(portfolio)) {
            return NextResponse.json({ message: 'Portfolio must be a valid URL' }, { status: 400 });
        }

        const collection = await dbConnect(collectionNameObj.userCollection);
        const email = session.user.email.toLowerCase();

        const currentUser = await collection.findOne({ email });
        if (!currentUser) {
            console.log(`User not found for email: ${email}`);
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const updateUserProfile = {
            $set: {
                name: name && name.trim() ? name.trim() : currentUser.name,
                bio: bio !== undefined ? bio.trim() : '',
                portfolio: portfolio !== undefined ? portfolio.trim() : '',
                location: location !== undefined ? location.trim() : '',
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

        return NextResponse.json({ message: 'Profile updated successfully', user: updatedUser.value }, { status: 200 });
    } catch (error) {
        console.error('Error updating profile:', error.message);
        return NextResponse.json({ message: 'Error updating profile', error: error.message }, { status: 500 });
    }
}