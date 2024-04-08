"use client";

import React, { useState, FormEvent, useEffect } from "react";

import emailjs from "@emailjs/browser";

import "./ContactForm.css";

require("dotenv").config();

interface ContactFormProps {
  // Define props here if any
}

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (formSubmitted) {
      setShowLoader(true);
      setShowCheckmark(false); // Ensure checkmark is not shown immediately
    }
  }, [formSubmitted]);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); // Indicate the process has started

    // Access form fields directly to check their values
    const form = e.currentTarget;
    const name = form.user_name.value.trim();
    const email = form.user_email.value.trim();
    const message = form.message.value.trim();

    // Validation: Check if any field is empty
    if (!name || !email || !message) {
      setWarningMessage("Please fill out all forms.");
      setIsSubmitting(false); // Reset submitting state because we're not proceeding
      return; // Exit the function early
    }

    // Fields are valid, so proceed and show the loader
    setShowLoader(true); // Moved inside validation check
    setFormSubmitted(true); // Proceed if validation passes

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
          setShowLoader(false); // Stop the loader
          // Wait a bit before showing the checkmark to ensure the transition is noticeable
          setTimeout(() => {
            setShowCheckmark(true); // Now show the checkmark
          }, 200); // Adjust this timing as needed

          setTimeout(() => {
            setShowCheckmark(false);
          }, 5000); // Adjust timing based on your UX needs

          setTimeout(() => setSuccessMessage(null), 5000);
        },
        (error) => {
          console.log(error);
          setErrorMessage("Something went wrong, please try again later.");
          setShowLoader(false); // Ensure loader is hidden on error

          setTimeout(() => setErrorMessage(null), 5000);
        }
      )
      .finally(() => {
        setIsSubmitting(false);
        setFormSubmitted(false); // Reset form submission state
        target.reset(); // Reset form fields
      });
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
          <span>{errorMessage}</span>
        </div>
      )}
      {warningMessage && (
        <div
          role="alert"
          className="alert alert-warning fixed top-0 left-0 right-0 z-50 mx-auto w-full max-w-md p-4 m-4 mt-16"
        >
          <span>{warningMessage}</span>
        </div>
      )}
      <div className="mx-4 md:mx-8 lg:ml-12">
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
              onChange={() => setWarningMessage(null)}
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
              onChange={() => setWarningMessage(null)}
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
              onChange={() => setWarningMessage(null)}
            />
          </div>
          <button type="submit" className="button" disabled={isSubmitting}>
            Send
          </button>
          {showLoader && (
            <div className="flex justify-center mt-4">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
