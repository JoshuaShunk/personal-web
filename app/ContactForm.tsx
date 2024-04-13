"use client";

import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

import "./ContactForm.css";

interface TurnstileOptions {
  sitekey: string;
  callback: (token: string) => void;
  theme?: string;
}

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (formSubmitted) {
      setShowLoader(true);
      setShowCheckmark(false); // Ensure checkmark is not shown immediately
    }
  }, [formSubmitted]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback";
    script.async = true;
    document.head.appendChild(script);

    window.onloadTurnstileCallback = function () {
      const siteKey = process.env.NEXT_PUBLIC_SITE_KEY;

      if (!siteKey) {
        console.error("NEXT_PUBLIC_SITE_KEY is not set");
        return; // Don't attempt to render Turnstile if the site key is missing
      }

      if (window.turnstile) {
        const options: TurnstileOptions = {
          sitekey: siteKey,
          theme: "light", // This will set the theme to light
          callback: (token) => {
            setTurnstileToken(token);
          },
        };(window.turnstile.render as any)("#turnstile-widget", options);
      }
    };

    return () => {
      document.head.removeChild(script);
      delete window.onloadTurnstileCallback; // Clean up the callback to prevent memory leaks
    };
  }, []);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); // Indicate the process has started

    // Access form fields directly to check their values
    const form = e.currentTarget;
    const name = form.user_name.value.trim();
    const email = form.user_email.value.trim();
    const message = form.message.value.trim();
    if (!turnstileToken) {
      setErrorMessage(
        "CAPTCHA token not received. Please refresh the page and try again."
      );
      return;
    }

    // Validation: Check if any field is empty
    if (!name || !email || !message) {
      setWarningMessage("Please fill out all forms.");
      setIsSubmitting(false); // Reset submitting state because we're not proceeding
      return; // Exit the function early
    }

    setShowLoader(true);
    setFormSubmitted(true); // Proceed if validation passes

    try {
      const response = await fetch("/api/recaptcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: turnstileToken }),
      });

      if (!response.ok) {
        // This handles HTTP errors which are not part of 2xx success status codes
        throw new Error(`Server responded with status: ${response.status}`);
      }

      let data;
      try {
        data = await response.json(); // Attempt to parse JSON from the response
      } catch (error) {
        // This handles JSON parsing errors
        throw new Error("Failed to parse JSON response");
      }

      //console.log("Server response:", data);

      if (data.message === "Verification successful") {
        // Proceed with email sending logic or any subsequent actions
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
                setShowCheckmark(false);
              }, 5000); // Adjust timing based on your UX needs

              setTimeout(() => setSuccessMessage(null), 5000);
            },
            (error) => {
              //console.log(error);
              setErrorMessage("Something went wrong, please try again later.");
              setShowLoader(false); // Ensure loader is hidden on error

              setTimeout(() => setErrorMessage(null), 5000);
            }
          );
      } else {
        // Handle business logic failures
        setErrorMessage(data.message || "Verification failed");
        throw new Error(data.message || "Verification failed");
      }
    } catch (error) {
      //console.error("Error during email sending:", error);
      setErrorMessage("Something went wrong, please try again later.");
    } finally {
      setIsSubmitting(false);
      setShowLoader(false);
      form.reset();
      setTurnstileToken(null); // Reset the token for the next form submission
    }
  };

  return (
    <div className="mx-4 md:mx-8 lg:ml-12">
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
      <form onSubmit={sendEmail} className="space-y-4 max-w-md">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="e.g. Joshua Shunk"
            name="user_name"
            required
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
            required
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
        <div id="turnstile-widget"></div>
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
  );
};

export default ContactForm;
