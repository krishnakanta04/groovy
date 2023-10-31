"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { TbActivityHeartbeat } from "react-icons/tb";
import { BsMoonFill } from "react-icons/bs";
import MusicSearchBar from "./MusicSearchBar";
import Link from "next/link";

export default function TopNavbar() {
  return (
    <Navbar maxWidth="2xl" className="p-0">
      <NavbarBrand as={Link} href="/">
        <div>
          <TbActivityHeartbeat size="1.5em" />
        </div>

        <p className="hidden sm:block font-bold">Groovy</p>
      </NavbarBrand>

      <NavbarContent justify="center" className="w-[900px]">
        <NavbarItem className="w-full">
          <MusicSearchBar />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <Button isIconOnly isDisabled>
          <BsMoonFill />
        </Button>
      </NavbarContent>
    </Navbar>
  );
}
