import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import SessionWrapper from "@/Providers/SessionWrapper";
import { Toaster } from "react-hot-toast";
import LayoutWrapper from "@/Providers/LayoutWrapper";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "DevelopersQuestions",
  description: "This is a Forum for devlopers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <SessionWrapper>
          <Toaster />
          {/* <Navbar /> */}
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </SessionWrapper>
      </body>
    </html>
  );
}
