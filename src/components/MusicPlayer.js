"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Progress } from "@nextui-org/progress";

import UseAnimations from "react-useanimations";
import playPause from "react-useanimations/lib/playPause";
import skipForward from "react-useanimations/lib/skipForward";
import skipBack from "react-useanimations/lib/skipBack";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAppContext } from "@/context/AppContext";

const AudioTimeline = ({ audioRef }) => {
  const [time, setTime] = useState();

  const handleTimeChange = (e) => {
    const progressBar = e.target;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const width = progressBar.clientWidth;
    const seekTime = (clickPosition / width) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setTime(seekTime);
  };

  const updateTimeline = useCallback(() => {
    setTime(audioRef?.current?.currentTime);
  }, [audioRef]);

  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.addEventListener("timeupdate", updateTimeline);
    }
  }, [audioRef, updateTimeline]);

  return (
    <div>
      <div
        onClick={handleTimeChange}
        className="absolute h-[6px] z-10 w-full overflow-hidden"
      ></div>

      <Progress
        size="sm"
        value={time}
        maxValue={audioRef?.current?.duration}
        classNames={{ indicator: "bg-white" }}
        aria-label="music timeline"
      />
    </div>
  );
};

const PlayPauseBtn = ({ audioRef, playing, setPlaying }) => {
  const handlePlaypause = () => {
    if (audioRef?.current?.paused) {
      audioRef?.current?.play();
      setPlaying(false);
    } else {
      audioRef?.current?.pause();
      setPlaying(false);
    }
  };

  return (
    <UseAnimations
      reverse={!playing}
      animation={playPause}
      onClick={handlePlaypause}
      size={28}
      strokeColor="white"
    />
  );
};

export default function MusicPlayer({ items }) {
  const audioRef = useRef(null);
  const { index, setIndex } = useAppContext();
  const [playing, setPlaying] = useState(false);

  const decIndex = () => {
    if (index > 0) setIndex((prevIndex) => prevIndex - 1);
    setPlaying(true);
  };

  const incIndex = () => {
    if (index < items.length - 1) setIndex((prevIndex) => prevIndex + 1);
    setPlaying(true);
  };

  useEffect(() => {
    if (index === 0) {
      audioRef.current.src = items[index].audioUrl;
      return;
    }
    audioRef.current.src = items[index].audioUrl;
    audioRef.current.play();
    setPlaying(true);
  }, [index, items]);

  return (
    <div className="fixed z-10 bottom-0 left-0 right-0">
      <audio ref={audioRef} autoPlay={playing} onEnded={incIndex} />
      <Card
        className="max-w-[600px] m-auto"
        radius="sm"
        aria-label="music player"
        isBlurred
      >
        <CardBody className="gap-1 p-3 overflow-hidden">
          <div className="flex items-center gap-3">
            <Image
              src={items[index].bestThumbnail.url}
              width={120}
              height={100}
              alt=""
              radius="sm"
            />

            <div className="overflow-hidden w-full flex justify-between gap-3">
              <p className="truncate max-w-[200px]">{items[index].title}</p>
              <div className="flex items-center justify-center gap-3">
                <div>
                  <UseAnimations
                    animation={skipBack}
                    size={18}
                    strokeColor="white"
                    onClick={decIndex}
                  />
                </div>
                <div className="ml-1">
                  <PlayPauseBtn
                    audioRef={audioRef}
                    playing={playing}
                    setPlaying={setPlaying}
                  />
                </div>
                <div>
                  <UseAnimations
                    animation={skipForward}
                    size={24}
                    strokeColor="white"
                    onClick={incIndex}
                  />
                </div>
              </div>
            </div>
          </div>
          <AudioTimeline audioRef={audioRef} />
        </CardBody>
      </Card>
    </div>
  );
}
