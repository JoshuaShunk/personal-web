"use client";

// Import the necessary hooks and components from React. `useState` manages state variables,
// `useEffect` handles side effects in functional components.
import React, { useState, useEffect } from "react";

// Import the emailjs library which enables sending emails directly from the frontend
// without needing a backend service to handle email sending.
import emailjs from "@emailjs/browser";

// Import stylesheet specific to the ContactForm component for styling purposes.
import "./ContactForm.css";

// Define a TypeScript interface for configuring the Turnstile CAPTCHA options.
// `sitekey` is mandatory for initializing the CAPTCHA, `callback` handles token reception,
// and `theme` is optional for setting visual theme of the CAPTCHA widget.
interface TurnstileOptions {
  sitekey: string;
  callback: (token: string) => void;
  theme?: string;
}

const ContactForm = () => {
  // State management hooks to control various aspects of form submission and UI feedback.
  const [isSubmitting, setIsSubmitting] = useState(false); // Controls the form submission state to prevent multiple submissions.
  const [showLoader, setShowLoader] = useState(false); // Flag to show a loading animation when the form is processing.
  const [showCheckmark, setShowCheckmark] = useState(false); // Flag to show a success icon once the submission is successful.
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Store and display a success message on successful email submission.
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Store and display an error message if the submission fails.
  const [warningMessage, setWarningMessage] = useState<string | null>(null); // Store and display a warning message for user input validation.
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null); // Store the CAPTCHA token once received, which is required for form submission.
  const [formSubmitted, setFormSubmitted] = useState(false); // Reflects whether the form has been submitted to control UI logic.

  // This effect handles the setup required when the form is submitted, specifically
  // controlling UI elements like loaders and checkmarks.
  useEffect(() => {
    if (formSubmitted) {
      setShowLoader(true);
      setShowCheckmark(false); // Reset checkmark display on new submission
    }
  }, [formSubmitted]);

  // This effect is responsible for dynamically loading the Turnstile CAPTCHA script,
  // setting up the CAPTCHA widget, and defining a callback to handle the received token.
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "turnstile-script";
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback";
    script.async = true;
    document.head.appendChild(script);

    // Define a global function to initialize the CAPTCHA once the script is loaded.
    // This includes setting the site key from environment variables and handling the token via callback.
    window.onloadTurnstileCallback = function () {
      const siteKey = process.env.NEXT_PUBLIC_SITE_KEY; // Fetch the site key from environment variables.
      const currentTheme = localStorage.getItem("theme") || "light"; // Determine the theme based on local storage or default to 'light'.

      if (!siteKey) {
        console.error("NEXT_PUBLIC_SITE_KEY is not set"); // Log error if site key is missing.
        return;
      }

      if (window.turnstile) {
        const options: TurnstileOptions = {
          sitekey: siteKey,
          theme: currentTheme === "dark" ? "dark" : "light",
          callback: (token) => {
            setTurnstileToken(token); // Set the received CAPTCHA token in state.
          },
        };
        (window.turnstile.render as any)("#turnstile-widget", options);
      }
    };

    // Cleanup function to remove the script and callback when the component unmounts.
    return () => {
      document.head.removeChild(script);
      delete window.onloadTurnstileCallback;
    };
  }, []);

  // This function handles the form submission event, including all validations,
  // CAPTCHA verification, and sending the email through emailjs.
  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); // Start the submission process and prevent further submissions.

    // Retrieve input values from the form.
    const form = e.currentTarget;
    const name = form.user_name.value.trim();
    const email = form.user_email.value.trim();
    const message = form.message.value.trim();

    // Validate CAPTCHA token reception; critical for backend verification.
    if (!turnstileToken) {
      setErrorMessage(
        "CAPTCHA token not received. Please complete the CAPTCHA."
      );
      setTimeout(() => setErrorMessage(null), 5000); // Clear the error message after 5 seconds.
      setIsSubmitting(false);
      return;
    }

    // Input validation: ensure all fields are filled.
    if (!name || !email || !message) {
      setWarningMessage("Please fill out all fields.");
      setIsSubmitting(false);
      return;
    }

    setShowLoader(true); // Show loading animation during the processing.
    setFormSubmitted(true); // Mark the form as submitted to trigger loaders and potentially disable inputs.

    try {
      // Perform the server-side verification of the CAPTCHA token.
      const response = await fetch("/api/recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: turnstileToken }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json(); // Parse the JSON response from the server.

      if (data.message === "Verification successful") {
        // Send the email using emailjs with the form's data and environment-specific keys.
        await emailjs
          .sendForm(
            process.env.NEXT_PUBLIC_SERVICE_ID!,
            process.env.NEXT_PUBLIC_TEMPLATE_ID!,
            form,
            process.env.NEXT_PUBLIC_PUBLIC_KEY!
          )
          .then(
            (result) => {
              setSuccessMessage("Message sent! I will get back to you soon.");
              setShowLoader(false);
              setShowCheckmark(true); // Display success checkmark.
              form.reset(); // Reset form fields after successful submission.
              setTimeout(() => setSuccessMessage(null), 5000); // Clear success message after 5 seconds.
            },
            (error) => {
              setErrorMessage("Failed to send message, please try again.");
              setShowLoader(false);
              setTimeout(() => setErrorMessage(null), 5000);
            }
          );
      } else {
        throw new Error(data.message || "Verification failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred, please try again later.");
      setIsSubmitting(false);
      setShowLoader(false);
    } finally {
      setIsSubmitting(false); // Reset submission state.
      setShowLoader(false); // Ensure loader is hidden on error.
      setTurnstileToken(null); // Reset the CAPTCHA token for security reasons.
    }
  };

  return (
    <div className="mx-4 md:mx-8 lg:ml-12">
      {/* Conditionally rendered success, error, and warning messages. */}
      {successMessage && (
        <div
          role="alert"
          className="alert alert-success fixed top-0 left-0 right-0 z-50 mx-auto w-full max-w-md p-4 m-4 mt-16"
        >
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
      {/* Form structure for user input */}
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
            required
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

export default ContactForm; // Export the ContactForm component for use in other parts of the application.
