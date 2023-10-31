"use client";
import { Input } from "@nextui-org/input";

import { BsSearch } from "react-icons/bs";

export default function MusicSearchBar() {
  return (
    <>
      <Input
        type="text"
        size="lg"
        className="max-w-[500px] m-auto"
        placeholder="Search your music..."
        radius="sm"
        startContent={<BsSearch />}
        isDisabled
      />
    </>
  );
}
