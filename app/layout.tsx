import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { NextAuthProvider } from "@/components/next-auth-provider";
import GoogleAnalytics from "@/components/google-analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Turbo Prompt",
  description: "Create and fill prompt templates easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextAuthProvider>
        {process.env.NODE_ENV !== "development" && <GoogleAnalytics />}
      </body>
    </html>
  );
}
