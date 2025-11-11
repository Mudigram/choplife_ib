import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "@/providers/Provider";
import Navbar from "@/components/navigation/Navbar";


export const metadata: Metadata = {
  title: "ChopLife IB",
  description: "Find the best spots, earn rewards, and live the good life in Ibadan — all with ChopLife IB",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {children}
            <Navbar />
          </Providers>

        </ThemeProvider>

      </body>
    </html>
  );
}
