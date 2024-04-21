import prisma from "@/prisma";
import { connectDB, disconnectDB } from "../../../utils/databse";

import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
    try {
        await connectDB();
        const post = await prisma.post.findMany();
        return NextResponse.json({message: "Data fetched successfully", post}, {status: 200})
    } catch (err) {
        return NextResponse.json({message: "Error fetching data", err}, {status: 500})
    } finally{
        await disconnectDB();
    }
};