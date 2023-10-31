import { NextResponse } from "next/server";
import ytdl from "ytdl-core";
import ytpl from "ytpl";

export async function POST(req) {
  try {
    const { playlistUrl } = await req.json();

    const checkPlaylistUrl = ytpl.validateID(playlistUrl);
    if (!checkPlaylistUrl)
      return NextResponse.json(
        { status: "failed", message: "Please enter a valid YT playlist url" },
        { status: 400 }
      );

    const playlistDetails = await ytpl(playlistUrl);

    const playlist = await Promise.all(
      playlistDetails.items.map(async (item) => {
        const info = await ytdl.getInfo(item.id);
        const highestAudio = ytdl.chooseFormat(info.formats, {
          quality: "highestaudio",
        });

        item.audioUrl = highestAudio.url;
      })
    );

    return NextResponse.json(playlistDetails);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json("Hello");
}
