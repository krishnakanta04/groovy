"use client";
import { Image } from "@nextui-org/image";
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody } from "@nextui-org/card";
import { useAppContext } from "@/context/AppContext";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

export default function PlaylistTable({ playlist }) {
  const { index, setIndex } = useAppContext();

  return (
    <div>
      <div className="flex flex-col items-center pb-[100px] gap-5">
        <div className="space-y-[10px] flex flex-col  max-w-[600px]">
          <Image
            src={playlist.bestThumbnail.url}
            width={400}
            height={200}
            alt="playlist thumbnail"
            isBlurred
          />
          <div className="flex flex-col gap-2">
            <p className="text-2xl">{playlist.title}</p>
            <div className="flex items-center gap-2">
              <Avatar size="sm" src={playlist.author.bestAvatar.url} />
              <p>{playlist.author.name}</p>
            </div>
            <p>
              <span className="font-bold">{playlist.estimatedItemCount}</span>{" "}
              music
            </p>
            <p>
              <span className="font-bold">{playlist.views}</span> views
            </p>

            {playlist.description === "" ? (
              <p>No description found!</p>
            ) : (
              <Accordion variant="splitted" className="p-0">
                <AccordionItem
                  key="1"
                  aria-label="description"
                  title="Description"
                >
                  <p>{playlist.description}</p>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        </div>

        <div className="w-full space-y-2">
          {playlist.items.map((item, i) => (
            <Card
              key={i}
              fullWidth="true"
              isPressable
              className="max-w-[600px] m-auto"
              radius="sm"
              onClick={() => setIndex(i)}
            >
              <CardBody className="flex-row items-center gap-3 p-1">
                <Image
                  src={item.bestThumbnail.url}
                  width={150}
                  height={100}
                  alt={item.title}
                  radius="sm"
                />
                <div className="overflow-hidden w-full">
                  <p className="truncate max-w-[300px]">{item.title}</p>
                  <p className="text-small text-default-500">{item.duration}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
