import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/app-context";
import { PhoneFrame } from "@/components/ui/phone-frame";

export const metadata: Metadata = {
  title: "Cirvoon",
  description: "Find people to play sports with",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-200">
        <AppProvider>
          <PhoneFrame>{children}</PhoneFrame>
        </AppProvider>
      </body>
    </html>
  );
}
