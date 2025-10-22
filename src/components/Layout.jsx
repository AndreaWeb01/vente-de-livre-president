import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "./BackToTop.jsx";
import { Outlet } from "react-router-dom";

export default function Layout(){
    return(
        <div className="flex flex-col min-h-screen">
           
            <Navbar />
            <main className="flex-grow py-24 md:py-24">
                 <Outlet />
            </main>
            <Footer />
            <BackToTop/>
        </div>
    )
}