'use client';

import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";

require("dotenv").config();

interface ContactFormProps {
  // Define props here if any
}

const ContactForm: React.FC<ContactFormProps> = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [stateMessage, setStateMessage] = useState<string | null>(null);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const target = e.target as HTMLFormElement;

    const service_id = process.env.NEXT_PUBLIC_SERVICE_ID;
    console.log(service_id);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        target,
        process.env.NEXT_PUBLIC_PUBLIC_KEY!
      )
      .then(
        (result) => {
          setStateMessage("Message sent!");
          setIsSubmitting(false);
          setTimeout(() => setStateMessage(null), 5000);
        },
        (error) => {
          console.log(error)
          setStateMessage("Something went wrong, please try again later.");
          setIsSubmitting(false);
          setTimeout(() => setStateMessage(null), 5000);
        }
      );

    target.reset();
  };

  return (
    <form onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" disabled={isSubmitting} />
      {stateMessage && <p>{stateMessage}</p>}
    </form>
  );
};

export default ContactForm;
