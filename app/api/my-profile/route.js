import { authOptions } from "@/lib/authOptions"
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(req) {
    // Log the request headers to debug cookies
    console.log('Request Headers--Server--->:', Object.fromEntries(req.headers))

    const session = await getServerSession(authOptions)
    console.log("Session:---Server--->", session)

    if (!session) {
        return NextResponse.json({ message: "Unauthorized access" }, { status: 401 })
    }

    try {
        const email = session.user.email
        if (!email) {
            return NextResponse.json({ message: "Email not found in session" }, { status: 400 })
        }

        const loggedinUser = await dbConnect(collectionNameObj.userCollection)
        const query = { email: email }
        const singleUser = await loggedinUser.findOne(query)

        if (!singleUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        return NextResponse.json(singleUser)
    } catch (error) {
        console.error("Error fetching user profile:", error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}