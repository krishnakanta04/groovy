import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col space-y-10 mt-5">
      <h1 className="text-[60px] text-center tracking-wider">
        Welcome to <br /> <span className="font-bold">Groovy!</span>
      </h1>
      <p className="max-w-[600px] text-center">
        Ready to turn your YouTube playlist into a listening experience?
        <br /> Simply{" "}
        <span className="underline underline-offset-4	">
          paste your playlist link
        </span>{" "}
        below, and we&apos;ll start playing the music you love.
        <br /> It&apos;s that easy!
      </p>
      <p>Let&apos;s get started</p>
      <SearchBar />
    </div>
  );
}
