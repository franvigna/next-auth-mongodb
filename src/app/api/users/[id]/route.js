import { connectDB } from "@/libs/mongodb";
import User from "../../../models/user";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newFullname: fullname, newEmail: email , newRole: role} = await request.json();
  await connectDB();
  await User.findByIdAndUpdate(id, { fullname, email, role });
  return NextResponse.json({ message: "User updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectDB();
  const user = await User.findOne({ _id: id });
  return NextResponse.json({ user }, { status: 200 });
}
