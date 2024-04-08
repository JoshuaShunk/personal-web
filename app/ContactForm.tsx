"use client";

import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";

require("dotenv").config();

interface ContactFormProps {
  // Define props here if any
}

const ContactForm: React.FC<ContactFormProps> = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const target = e.target as HTMLFormElement;

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        target,
        process.env.NEXT_PUBLIC_PUBLIC_KEY!
      )
      .then(
        (result) => {
          setSuccessMessage("Message sent! I will get back to you soon.");
          setIsSubmitting(false);
          setTimeout(() => setSuccessMessage(null), 5000);
        },
        (error) => {
          console.log(error);
          setErrorMessage("Something went wrong, please try again later.");
          setIsSubmitting(false);
          setTimeout(() => setErrorMessage(null), 5000);
        }
      );

    target.reset();
  };

  return (
    <div>
      {successMessage && (
        <div
          role="alert"
          className="alert alert-success fixed top-0 left-0 right-0 z-50 mx-auto w-full max-w-md p-4 m-4 mt-16"
        >
          {/* Success Icon and Message */}
          <span>{successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div
          role="alert"
          className="alert alert-error fixed top-0 left-0 right-0 z-50 mx-auto w-full max-w-md p-4 m-4 mt-16"
        >
          {/* Error Icon and Message */}
          <span>{errorMessage}</span>
        </div>
      )}
      <div className="ml-4 md:ml-8 md:mr-8 lg:ml-12">
        <form onSubmit={sendEmail} className="space-y-4 max-w-md">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g. Joshua"
              name="user_name"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="e.g. name@site.com"
              name="user_email"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Message</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Message"
              name="message"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;