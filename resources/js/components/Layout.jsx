import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "./BackToTop.jsx";

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow py-24 md:py-24">
                {children}
            </main>
            <Footer />
            <BackToTop/>
        </div>
    )
}