import React, { useCallback, useMemo } from "react";
import Sidebar from "../../components/Sidebar";
import Layout from "../../components/Layout";
import VideoJSPlayer from "../../components/VideoJSPlayer";
import { useTranslation } from "react-i18next";

export default function FormPlayerVideo({ formation, player  }) {
  const { t } = useTranslation();
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
      <section className="p-4 mt-5 md:mt-5">
        <div className="flex gap-4 items-start">
          <Sidebar />
          <div className="w-full  p-6" onContextMenu={handleContextMenu}>
            <div className="max-w-5xl mx-auto">
              <h1 className="text-3xl font-bold mb-6 text-gray-800">
                {formation.titre}
              </h1>
              <div className="flex justify-center items-center bg-black p-0 rounded-xl shadow-lg w-full">
                {videoUrl ? (
                  <div className="w-full max-w-full">
                    <VideoJSPlayer
                      src={ `/storage/${formation.url_video}`}
                      type={videoUrl.endsWith(".m3u8") ? "application/x-mpegURL" : "video/mp4"}
                      className="vjs-big-play-centered w-full"
                      height="auto"
                    />
                  </div>
                ) : (
                  <div className="text-white text-center py-10 w-full">
                    <p>{t("trainings.noVideo")}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">{t("common.description")}</h2>
                <p className="text-gray-700 leading-relaxed">{formation.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
