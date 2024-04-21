import prisma from "@/prisma";
import { connectDB, disconnectDB } from "../../../utils/databse";

import { NextResponse } from "next/server";

export const GET = async (req: Request, res: NextResponse) => {
    try {
        await connectDB();
        const post = await prisma.post.findMany();
        // Create a NextResponse object with the data
        const response = NextResponse.json({ message: "Data fetched successfully", post });
        
        // Set the Cache-Control header to 'no-store'
        response.headers.set('Cache-Control', 'no-store');

        return response;
    } catch (err) {
        return NextResponse.json({message: "Error fetching data", err}, {status: 500})
    } finally{
        await disconnectDB();
    }
};