import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat App",
  description: "App for chatting with friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <ul className="flex gap-2 text-blue-500">
            <li className="hover:underline">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:underline">
              <Link href="/signin">Sign in</Link>
            </li>
            <li className="hover:underline">
              <Link href="/signup">Sign up</Link>
            </li>
          </ul>
        </nav>

        {children}
      </body>
    </html>
  );
}
