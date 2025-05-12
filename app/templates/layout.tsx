import Navbar from "@/components/navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar showLinks={false} />
      <div className="container mx-auto space-y-8 pt-4 px-4 md:px-6">
        {children}
      </div>
    </div>
  );
}
