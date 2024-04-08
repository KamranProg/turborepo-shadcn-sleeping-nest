import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "@repo/ui/components/ui/sonner";
import { cn } from "@repo/ui/lib/utils";
import { TanStackQueryProvider } from "../providers/TanStackQueryProvider";
import "@repo/ui/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(poppins.className, "dark")}>
        <TanStackQueryProvider>{children}</TanStackQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
