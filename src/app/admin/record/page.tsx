"use client";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import UserList from "../../components/UserList";

function RecordAdmin() {
  const { data: session } = useSession();

  if (session?.user.role === "admin") {
    return(
        <div className="h-[calc(100vh-4rem)] flex flex-col gap-y-10 items-center justify-start">
            <h1 className="font-bold text-3xl mt-28">Admin</h1>
            <br />

          <UserList/>


        </div>
        
    )

  }
  redirect('/dashboard/profile');

}

export default RecordAdmin;