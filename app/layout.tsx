import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

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
      <body className={`${inter.className} bg-dark-1 text-white`}>
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
          <Toaster />

          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
