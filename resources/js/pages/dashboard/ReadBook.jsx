
import PdfReader from "../../components/PdfReader";
// import test from "/test.pdf";
import Sidebar from "../../components/Sidebar";

export default function ReadBook() {
  return (
    <>
    
        <section className='p-4 mt-5  md:mt-5'>
            <div className="flex gap-4 items-start">
                <Sidebar/>
                <div className="lg:h-screen flex-1 w-full">
                    <PdfReader pdfFile= "/livre.pdf" />
                </div>
            </div>
            
        </section>
    </>
    
  );
}
