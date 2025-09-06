import "./globals.css";
import SessionWrapper from "./SessionWrapper";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TokenCounter from "./components/TokenCounter";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <Navbar />
          <TokenCounter />
          {children}
          <Footer/>
        </SessionWrapper>
      </body>
    </html>
  );
}
