import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
// import type { NextApiRequestContext } from "next";
export async function GET(req, { params }) {
    try {
        const id = params.id;

        if (!id) {
            return NextResponse.json({ message: "Invalid request" }, { status: 400 });
        }

        const blogCollection = await dbConnect(collectionNameObj.blogCollection);
        const blog = await blogCollection.findOne({ _id: new ObjectId(id) });

        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (err) {
        console.error("GET /comment error:", err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function PATCH(req, { params }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const id = params.id;

        if (!id) {
            return NextResponse.json({ message: "Invalid request" }, { status: 400 });
        }

        const { userName, userEmail, userImage, comment } = await req.json();

        if (!userEmail || !comment) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const blogCollection = await dbConnect(collectionNameObj.blogCollection);
        const postId = new ObjectId(id);
        const blog = await blogCollection.findOne({ _id: postId });

        if (!blog) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        const newComment = {
            userName,
            userEmail,
            userImage,
            comment,
            createdAt: new Date(),
        };

        const updated = await blogCollection.updateOne(
            { _id: postId },
            { $push: { comments: newComment } }
        );

        return NextResponse.json({
            message: "Comment added successfully",
            updated,
        });
    } catch (error) {
        console.error("PATCH /comment error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}


