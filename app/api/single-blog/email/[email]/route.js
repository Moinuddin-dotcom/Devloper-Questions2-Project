import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
    }


    const { email } = params
    if (!email) return NextResponse.json({ message: "Email not found" }, { status: 400 });

    if (session?.user?.email !== email) {
        return NextResponse.json({ message: "Forbidden: Email does not match logged-in user" }, { status: 403 });
    }
    try {
        const collection = await dbConnect(collectionNameObj.blogCollection);
        const blog = await collection.find({ email: email }).toArray();
        if (blog.length === 0) {
            return NextResponse.json({ error: "No blogs found" }, { status: 404 });
        }

        return NextResponse.json(blog, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}