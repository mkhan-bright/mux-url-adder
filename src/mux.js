export async function uploadToMux(mediaAsset, muxToken, muxSecret) {
  const response = await fetch("https://api.mux.com/video/v1/uploads", {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${muxToken}:${muxSecret}`)}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: mediaAsset.url,
      playback_policy: "public",
    }),
  });

  const muxData = await response.json();
  return muxData.data;
}
