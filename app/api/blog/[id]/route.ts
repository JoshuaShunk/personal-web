import { NextResponse } from "next/server";
import { connectDB, disconnectDB } from "../../../../utils/databse";
import prisma from "@/prisma";

// This comment to test api cache prediciton
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];
    await connectDB();
    const post = await prisma.post.findFirst({ where: { id } });
    if (!post)
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await disconnectDB();
  }
};
