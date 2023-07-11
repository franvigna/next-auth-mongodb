"use client";

import { SessionProvider } from "next-auth/react";

// Contexto de providers para toda la app
// Datos de usuario en toda la app 

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}