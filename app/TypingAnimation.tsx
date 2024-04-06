import React, { useState, useEffect } from "react";

interface TypingAnimationProps {
  text: string;
  typingSpeed?: number;
  className?: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  typingSpeed = 150,
  className = "",
}) => {
  const [animation, setAnimation] = useState<string>("");
  const [showCursor, setShowCursor] = useState<boolean>(true);

  useEffect(() => {
    let currentAnimation = "";
    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        currentAnimation += text.charAt(i);
        setAnimation(currentAnimation);
      }, typingSpeed * i);
    }

    setTimeout(() => {
      setShowCursor(false);
    }, text.length * typingSpeed + 500); // Adding a slight delay after finishing typing before hiding the cursor

    // Cleanup timeouts on component unmount or when text changes
    return () => {
      for (let i = 0; i <= text.length; i++) {
        clearTimeout(i);
      }
    };
  }, [text, typingSpeed]);

  return (
    <h1 className={`${className}`}>
      {animation}
      {showCursor && <span className="animate-blink">|</span>}
    </h1>
  );
};

export default TypingAnimation;
