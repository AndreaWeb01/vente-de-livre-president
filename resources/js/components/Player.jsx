import React from "react";
import ReactPlayer from "react-player";

export default function VideoPlayer({ url }) {
 
  return (
    <div className="flex justify-center items-center min-h-[400px] bg-white">
      <ReactPlayer
        src={url}
        controls
        width="100%"
        height="400px"
        style={{ maxWidth: "720px" }}
      />
    </div>
  );
}
