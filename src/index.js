import { uploadToMux } from "./mux";

DatoCmsPlugin.init(async (plugin) => {
  const muxToken = plugin.parameters.global.mux_token;
  const muxSecret = plugin.parameters.global.mux_secret;

  // Add event listener for media uploads
  plugin.addEventListener("onMediaUpload", async (mediaAsset) => {
    if (mediaAsset.mimeType.includes("video")) {
      try {
        // Upload video to Mux and get the playback URL
        const muxAsset = await uploadToMux(mediaAsset, muxToken, muxSecret);

        // Update the media asset description with the Mux URL
        const updatedDescription = `${
          mediaAsset.description || ""
        }\nMux URL: https://stream.mux.com/${muxAsset.playback_id}.m3u8`;

        await plugin.updateMediaAsset(mediaAsset.id, {
          description: updatedDescription,
        });

        console.log("Mux URL added to the video description.");
      } catch (error) {
        console.error("Error uploading to Mux:", error);
      }
    }
  });
});
