import React from "react";

import ContactForm from "../ContactForm";
import TypingAnimation from "../TypingAnimation.client";

const contactPage = () => {
  return (
    <div>
      <TypingAnimation
        text="Contact Me"
        className="text-4xl font-bold ml-10 pb-5"
      />

      <ContactForm />
    </div>
  );
};

export default contactPage;
