"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";


function Navbar() {
  const { data: session } = useSession();

  if (session?.user.role === "admin") {
    return (
      <nav className="bg-zinc-900 p-4">
        <div className="container mx-auto flex justify-between">
          <Link href="/dashboard/profile">
            <h1 className="font-bold text-xl">NextAuth</h1>
          </Link>

          <ul className="flex gap-x-2">
                <li className="px-3 py-1">
                    <Link href="/admin/record">Admin</Link>
                </li>
                <li className="px-3 py-1">
                    <Link href="/dashboard/profile">Perfil</Link>
                </li>
                <li className="px-3 py-1">
                    <Link href="/api/auth/signout">Logout</Link>
                </li>
          </ul>
        </div>
      </nav>
    )
  }else return (
    <nav className="bg-zinc-900 p-4">
    <div className="container mx-auto flex justify-between">
      <Link href="/">
        <h1 className="font-bold text-xl">NextAuth</h1>
      </Link>

      <ul className="flex gap-x-2">

            <li className="px-3 py-1">
                <Link href="/dashboard/profile">Perfil</Link>
            </li>
            <li className="px-3 py-1">
                <Link href="/api/auth/signout">Logout</Link>
            </li>
      </ul>
    </div>
  </nav>
  )

    
}

export default Navbar;