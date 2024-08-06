import type { Metadata } from "next";
import "./globals.css";
import Footer from './footer'
import Header from './header'
import ThemeProvider from './providers'


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
      <body >
        <Header />
        <ThemeProvider> 
          {children} 
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
