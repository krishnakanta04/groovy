import getPlaylist from "@/app/lib/getPlaylist";
import MusicPlayer from "@/components/MusicPlayer";
import PlaylistTable from "@/components/PlaylistTable";
import TopNavbar from "@/components/TopNavbar";

export default async function Player({ params }) {
  const playlistUrl = decodeURIComponent(params.playlistUrl);
  const playlist = await getPlaylist(playlistUrl);
  return (
    <div>
      <TopNavbar />
      <PlaylistTable playlist={playlist} />
      <MusicPlayer items={playlist.items} />
    </div>
  );
}
