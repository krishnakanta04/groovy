"use client";
import UseAnimations from "react-useanimations";
import activity from "react-useanimations/lib/activity";
export default function Loading() {
  return (
    <div>
      <div className="h-[80vh] flex flex-col justify-center items-center">
        <UseAnimations
          animation={activity}
          strokeColor="white"
          size={100}
          pathCss="stroke-width: 5%"
        />
        <p>Loading music playlist...</p>
      </div>
    </div>
  );
}
