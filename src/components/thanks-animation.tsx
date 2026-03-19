"use client";

import Lottie from "lottie-react";
import thanksAnimation from "../../public/thanks.json";

export function ThanksAnimation() {
  return (
    <Lottie
      animationData={thanksAnimation}
      loop={false}
      className="w-64 h-64 mx-auto"
    />
  );
}
