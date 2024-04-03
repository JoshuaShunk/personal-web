"use client";

import Image from "next/image";
import { FaCode, FaGithub, FaLinkedin } from "react-icons/fa";

import { useState, useEffect } from "react";
import { Badge, Button, DataList, Link } from "@radix-ui/themes";

import researchImage from "../public/NSDropoutEquationWEB.png";

export default function Home() {
  const [name, setName] = useState("");
  const [typingAnimation, setTypingAnimation] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const name = "Joshua Shunk";
    setName(name);

    let animation = "";
    const typingSpeed = 150; // Time in milliseconds between each character

    for (let i = 0; i < name.length; i++) {
      setTimeout(() => {
        animation += name.charAt(i);
        setTypingAnimation(animation);
      }, typingSpeed * i);
    }

    // Set a timeout to stop the cursor blinking once the name has fully appeared
    setTimeout(() => {
      setShowCursor(false); // This stops the cursor from blinking
    }, name.length * typingSpeed);
  }, []);
  return (
    <>
      <div className="flex flex-col items-center min-h-screen py-10">
        <h1 className="text-6xl font-bold">
          {typingAnimation}
          {showCursor && <span className="animate-blink">|</span>}
        </h1>

        <div className="flex mt-6 space-x-4 mb-6">
          <Link
            href="https://github.com/JoshuaShunk?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={50} />
          </Link>
          <Link
            href="https://linkedin.com/in/joshuashunk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={50} />
          </Link>
        </div>
        <div className="flex justify-center mb-5">
          <Badge>Software Engineering</Badge>
          <Badge>Machine Learning</Badge>
          <Badge>Web Development</Badge>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-center max-w-md mt-4">
            I'm a software engineer with a passion for machine learning,
            algorithms, and web development. Currently studying computer science
            @
            <div className="dropdown dropdown-hover inline-block">
              <span
                tabIndex={0}
                role="button"
                className="text-info underline hover:cursor-pointer"
              >
                Stanford
              </span>
              <div
                tabIndex={0}
                className="dropdown-content card compact shadow bg-base-100 rounded-box w-64 z-10"
              >
                <div className="card-body">
                  <h2 className="card-title">
                    Want to know more about my education?
                  </h2>
                  <p> Check out my eduction page!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-10 mt-5">
          <div className="card w-96 bg-base-100 shadow-xl hover:scale-105 transition-transform duration-200">
            <figure className="px-10 pt-10">
              <img
                src={researchImage.src}
                alt="Research"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Research</h2>
              <div className="card-actions">
                <button className="btn btn-primary">Learn More</button>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl hover:scale-105 transition-transform duration-200">
            <figure className="px-10 pt-10">
              <img
                src={researchImage.src}
                alt="Projects"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Projects</h2>
              <div className="card-actions">
                <button className="btn btn-primary">View</button>
              </div>
            </div>
          </div>
        </div>

        <a
          href="/JoshResume.pdf"
          download
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10"
        >
          Download Resume
        </a>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-gray-500 mb-4">Made w/ &#10084; by Josh</p>
        <Link
          href="https://github.com/JoshuaShunk/personal-web"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center"
        >
          <FaGithub size={20} />
        </Link>
      </div>
    </>
  );
}
