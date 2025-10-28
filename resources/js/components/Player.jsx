import ReactPlayer from "react-player"
export default function Player(){
    return(
        <div>
            <h1>ma video</h1>
            <ReactPlayer
                src="/Video.mp4"
                style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
                controls
              
            />
        </div>
    )
}
