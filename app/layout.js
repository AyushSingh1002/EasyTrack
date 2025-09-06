import "./globals.css";
import SessionWrapper from "./SessionWrapper";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <Navbar />

          {children}
          <Footer/>
        </SessionWrapper>
      </body>
    </html>
  );
}
