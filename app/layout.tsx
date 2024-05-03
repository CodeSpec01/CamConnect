import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cam Connect",
  description: "Cam Connect - Connect Seamlessly, Communicate Effortlessly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: 'icons/logo.svg'
          },
          variables: {
            colorText: '#fff',
            colorPrimary: '#5682b8',
            colorBackground: '#1C1F2E',
            colorInputBackground: '#252A41',
            colorInputText: '#fff'
          }
        }}
      >

        <body className={`${inter.className} bg-dark-1 text-white`}>{children}</body>
      </ClerkProvider>
    </html>
  );
}
