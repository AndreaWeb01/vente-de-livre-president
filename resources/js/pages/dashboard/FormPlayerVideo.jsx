import React, { useCallback, useMemo } from "react";
import Sidebar from "../../components/Sidebar";
import Layout from "../../components/Layout";
import VideoJSPlayer from "../../components/VideoJSPlayer";

export default function FormPlayerVideo({ formation, player }) {
  const videoUrl = useMemo(() => {
    if (player) {
      return player;
    }

    if (!formation?.url_video) {
      return null;
    }

    return formation.url_video.startsWith("http")
      ? formation.url_video
      : `/storage/${formation.url_video}`;
  }, [formation, player]);

  const handleContextMenu = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <Layout>
      <section className="p-2 md:p-4 mt-4 md:mt-5">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <Sidebar />
          <div className="w-full bg-gray-50 p-0 md:p-6" onContextMenu={handleContextMenu}>
            <div className="w-full max-w-full mx-auto">
              <h1 className="text-3xl font-bold mb-6 text-gray-800">
                🎓 {formation.titre}
              </h1>
              {/* URL masquée pour l'UI */}

              <div className="flex justify-center items-center bg-black p-0 rounded-xl shadow-lg">
                {videoUrl ? (
                  <VideoJSPlayer
                    src={videoUrl}
                    type={videoUrl.endsWith(".m3u8") ? "application/x-mpegURL" : "video/mp4"}
                    className="vjs-big-play-centered"
                    fluid={true}
                    aspectRatio="16:9"
                  />
                ) : (
                  <div className="text-white text-center py-10">
                    <p>Aucune vidéo disponible pour cette formation.</p>
                  </div>
                )}
              </div>

              <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700 leading-relaxed">{formation.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
