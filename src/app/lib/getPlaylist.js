export default async function getPlaylist(playlistUrl) {
  try {
    const response = await fetch(process.env.URL + "/api/getPlaylist", {
      method: "POST",
      body: JSON.stringify({ playlistUrl }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
