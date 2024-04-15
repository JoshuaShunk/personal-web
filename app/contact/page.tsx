import React from "react";

import ContactForm from "../ContactForm";
import TypingAnimation from "../TypingAnimation.client";

const contactPage = () => {
  return (
    <div
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
      }}
    >
      <TypingAnimation
        text="Contact Me"
        className="text-4xl font-bold ml-10 pb-2"
      />
      <p className="text-base font-semibold ml-11 pb-5">
        I would love to get in touch!
      </p>

      <ContactForm />
    </div>
  );
};

export default contactPage;
