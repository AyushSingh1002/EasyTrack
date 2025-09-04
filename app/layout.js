import "./globals.css";
import SessionWrapper from "./SessionWrapper";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <SessionWrapper>
            <Navbar />
            {children}
            <Footer/>
          </SessionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
