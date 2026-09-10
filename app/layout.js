import "./globals.css";
import SessionWrapper from "./SessionWrapper";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "EazieTrack — a calmer job search",
  description: "Organize applications, understand your fit, and move through your job search with clarity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-background">
      <body>
        <SessionWrapper>
          <Navbar />
          {children}
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}

export const viewport = { themeColor: "#07111f", width: "device-width", initialScale: 1 };
