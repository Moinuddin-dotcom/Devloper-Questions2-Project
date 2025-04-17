
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { NextResponse } from "next/server"

// Getting all blogCollection data
export const GET = async () => {
    const blogCollection = await dbConnect(collectionNameObj.blogCollection)
    const result = await blogCollection.find({}).toArray()
    return NextResponse.json(result)
}

// Posting to blogCollection
export const POST = async (req) => {
    const body = await req.json()
    const blogCollection = await dbConnect(collectionNameObj.blogCollection)
    const result = await blogCollection.insertOne(body)
    return NextResponse.json(result)
}
