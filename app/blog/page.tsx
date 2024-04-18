import React from "react";
import TypingAnimation from "../TypingAnimation.client";

const blogPage = () => {
  return (
    <div>
      <TypingAnimation
        text="The Blog"
        className="text-6xl font-bold ml-10 pb-5"
      />
      <h1 className="pl-9">Coming Soon!</h1>
    </div>
  );
};

export default blogPage;
