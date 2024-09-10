import type { Metadata } from "next";
import "./globals.css";
import Footer from './footer'
import Header from './header'
import ThemeProvider from './providers'
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Evan's AI App",
  description: "Evan create a Ai Test App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <body >
        <Header />
        <ThemeProvider> 
          {children} 
        </ThemeProvider>
        <Toaster/>
        <Footer />
      </body>
    </html>
  );
}
