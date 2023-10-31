"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import { BsSearch } from "react-icons/bs";
import UseAnimations from "react-useanimations";
import activity from "react-useanimations/lib/activity";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SearchBar() {
  const router = useRouter();
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const { playlist, setPlaylist } = useAppContext();
  useEffect(() => {
    if (Object.keys(playlist).length !== 0) {
      router.push("/player");
    }
  }, [playlist, router]);

  const fetchPlaylist = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/getPlaylist", {
        method: "POST",
        body: JSON.stringify({ playlistUrl }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      setPlaylist(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Input
        type="text"
        size="lg"
        className="max-w-[600px] m-auto"
        placeholder="Playlist link here..."
        radius="sm"
        value={playlistUrl}
        onValueChange={setPlaylistUrl}
        endContent={
          <Button
            color="primary"
            radius="sm"
            isLoading={loading}
            spinner={<UseAnimations animation={activity} strokeColor="white" />}
            as={Link}
            href={`/player/${encodeURIComponent(playlistUrl)}`}
          >
            {loading ? null : <BsSearch />}
          </Button>
        }
      />
    </>
  );
}
