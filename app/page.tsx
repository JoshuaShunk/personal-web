"use client";

import Image from "next/image";
import { FaCode, FaGithub, FaLinkedin } from "react-icons/fa";

import { useState, useEffect } from "react";
import { Badge, Button, DataList, Link } from "@radix-ui/themes";

import TypingAnimation from "./TypingAnimation.client";

import researchImage from "/public/nsDropout.svg";
import furhat from "/public/furhat.png";


export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center min-h-screen py-10">
        <TypingAnimation text="Joshua Shunk" className="text-6xl font-bold" />
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
        <div className="flex justify-center mb-2">
          <Badge className="mx-2">Software Engineering</Badge>
          <Badge className="mx-2">Machine Learning</Badge>
          <Badge className="mx-2">Web Development</Badge>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-center max-w-md mt-4">
            I&#39;m a computer science major with a passion for machine
            learning, algorithms, and web development. Currently studying
            computer science @
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
        <div className="flex flex-col md:flex-row justify-center space-x-0 md:space-x-10 space-y-4 md:space-y-0 mt-5">
          <div className="card w-96 bg-base-100 shadow-xl hover:scale-105 transition-transform duration-200">
            <figure className="px-10 pt-10">
              <Image
                src={researchImage.src}
                alt="Research"
                width={500} // Original or desired width for aspect ratio
                height={300} // Original or desired height for aspect ratio
                className="w-full h-auto rounded-xl" // TailwindCSS classes for responsive scaling
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Research</h2>
              <div className="card-actions">
                {/* Update for Learn More button */}
                <Link href="/research" className="w-full">
                  <Button className="btn btn-primary flex-1 mx-2">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl hover:scale-105 transition-transform duration-200">
            <figure className="px-10 pt-10">
              <Image
                src={furhat.src}
                alt="Research"
                width={500} // Original or desired width for aspect ratio
                height={300} // Original or desired height for aspect ratio
                className="w-full h-auto rounded-xl" // TailwindCSS classes for responsive scaling
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Projects</h2>
              <div className="card-actions">
                {/* Update for View button */}
                <Link href="/projects" className="w-full">
                  <Button className="btn btn-primary flex-1 mx-2">View</Button>
                </Link>
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
        <p className="text-gray-500 mb-4">
          Made w/ &#160; &#10084; &#160; by Josh
        </p>
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
