
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
// import { authOptions } from "@/lib/auth" // adjust path if needed


export const GET = async (req, { params }) => {
    const questionCollection = await dbConnect(collectionNameObj.questionCollection);
    const query = { _id: new ObjectId(params.id) };
    const singleQus = await questionCollection.findOne(query);

    return NextResponse.json(singleQus);
};

export const PATCH = async (req, { params }) => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const questionCollection = await dbConnect(collectionNameObj.questionCollection);
    const postId = new ObjectId(params.id);
    const body = await req.json();
    const { userName, userEmail, userImage, comment } = body;

    if (!userEmail || !comment) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const post = await questionCollection.findOne({ _id: postId });
    if (!post) {
        return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const newComment = {
        userName,
        userEmail,
        userImage,
        comment,
        createdAt: new Date(),
    };

    const updateComments = [...(post.comments || []), newComment];

    const updateRes = await questionCollection.updateOne(
        { _id: postId },
        { $set: { comments: updateComments } }
    );

    return NextResponse.json({
        message: "Comment added",
        updateRes,
    });
};

