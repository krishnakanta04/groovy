"use client";

import UseAnimations from "react-useanimations";
import activity from "react-useanimations/lib/activity";

export default function Test() {
  return (
    <div className="h-[80vh] flex justify-center items-center">
      <UseAnimations
        animation={activity}
        strokeColor="white"
        size={100}
        pathCss="stroke-width: 2%"
      />
    </div>
  );
}
