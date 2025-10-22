
// import VideoPlayer from "../../components/VideoPlayer";
// import test from "/test.pdf";
import Sidebar from "../../components/Sidebar";
import Player from "../../components/Player";
// import video1  from '/video1.mp4';


export default function FormPlayerVideo() {
  return (
    <>
    
        <section className='p-4 mt-5  md:mt-5'>
            <div className="flex gap-4 items-start">
                <Sidebar/>
                <div className="h-screen flex-1">
                   <Player></Player>
                </div>
            </div>
            

        </section>
    </>
    
  );
}
