"use client";
import { useSession, signOut } from "next-auth/react";

function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return(
        <>
            <p>Loading...</p>
        </>
    )
  }

  if (status === "authenticated") {
    return (
    <div className="h-[calc(100vh-4rem)] flex flex-col gap-y-10 items-center justify-center">
      <h1 className="font-bold text-3xl mt-28">Profile</h1>
      
      <h3>Nombre: {session.user.fullname}</h3>

      <h4>Email: {session.user.email}</h4>
      <h4>Role: {session.user.role}</h4>

      <pre className="bg-zinc-800 p-4">
        {JSON.stringify(
          {
            session,
            status,
          },
          null,
          2
        )}
      </pre>

      <button
        className="bg-zinc-800 px-4 py-2 block mb-2"
        onClick={() => {
          signOut();
        }}
      >
        Signout
      </button>
    </div>
  );
}
}
export default ProfilePage;