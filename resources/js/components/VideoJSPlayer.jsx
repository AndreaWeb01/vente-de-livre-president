import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function VideoJSPlayer({ src, type = "video/mp4", poster, className, width = "100%", height = "75vh", fluid = true, aspectRatio = "16:9" }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    playerRef.current = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      preload: "auto",
      fluid,
      aspectRatio: fluid ? aspectRatio : undefined,
      fill: fluid ? true : undefined,
      width: fluid ? undefined : width,
      height: fluid ? undefined : height,
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
      controlBar: {
        pictureInPictureToggle: false,
        download: false,
      },
      sources: [{ src, type }],
      poster,
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src, type, poster]);

  return (
    <div onContextMenu={(e) => e.preventDefault()} style={{ width: fluid ? '100%' : width, height: fluid ? undefined : height }}>
      <video
        ref={videoRef}
        className={`video-js vjs-default-skin ${fluid ? 'vjs-fluid' : 'vjs-fill'} ${className ?? ""}`}
        controls
        playsInline
        controlsList="nodownload noplaybackrate" 
        disablePictureInPicture
        style={{ width: fluid ? '100%' : '100%', height: fluid ? undefined : '100%' }}
      />
    </div>
  );
}


