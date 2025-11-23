import React from "react";
import Lottie from "lottie-react";
import meditationAnimation from "./animations/meditation.json"; // or whichever animation you chose

const AnimatedBackground = () => {
  return (
<div className="animated-container">
      <Lottie
        animationData={meditationAnimation}
        loop
        autoplay
        className="animation-full"
      />
    </div>
  );
};

export default AnimatedBackground;
