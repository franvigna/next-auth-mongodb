import { connectDB } from "@/libs/mongodb";
import User from "../../models/user";
import { NextResponse } from "next/server";


export async function GET() {
  await connectDB();
  const users = await User.find();
  return NextResponse.json({ users });
}


export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectDB();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  }
  