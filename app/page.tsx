"use client";

import Image from "next/image";
import { FaCode, FaGithub, FaLinkedin } from "react-icons/fa";

import { useState, useEffect } from "react";
import { Badge, Button, DataList, Link } from "@radix-ui/themes";

import TypingAnimation from "./TypingAnimation.client";

import researchImage from "/public/nsDropout.svg";
import furhat from "/public/furhat.png";
import googleEarth from "/public/googleEarth.jpg";
import homePage from "/public/homepage.png";

import CardWithCarousel from "./CardWithCarousel";

import "./globals.css";

export default function Home() {
  return (
    <>
      <div
        className="bg-base-100 text-base-content h-auto flex flex-col items-center py-10"
        style={{
          backgroundColor: "var(--background-color)",
          color: "var(--text-color)",
        }}
      >
        <TypingAnimation
          text="Joshua Shunk"
          className="text-5xl md:text-6xl font-bold"
        />
        <div className="flex mt-6 space-x-4 mb-6">
          <Link
            href="https://github.com/JoshuaShunk?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={50} color="blue" />
          </Link>
          <Link
            href="https://linkedin.com/in/joshuashunk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={50} color="blue" />
          </Link>
        </div>
        <div className="flex justify-center mb-2 w-max">
          <Badge color="blue" className="text-xs sm:text-sm mx-2">
            Software Engineering
          </Badge>
          <Badge color="blue" className="text-xs sm:text-sm mx-2">
            Machine Learning
          </Badge>
          <Badge color="blue" className="text-xs sm:text-sm mx-2">
            Web Development
          </Badge>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-center max-w-md mt-4">
            I&#39;m a computer science major with a passion for machine
            learning, algorithms, and web development. Currently studying
            computer science @ Stanford University.
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-10 space-y-4 md:space-y-0 mt-5">
          <div className="card w-96 bg-base-100 shadow-xl hover:scale-105 transition-transform duration-200 h-[400px] flex flex-col justify-between">
            <figure className="px-10 pt-12 h-2/3">
              <Image
                src={researchImage.src}
                alt="Research"
                width={500}
                height={300}
                className="w-full h-auto rounded-xl overflow-hidden research-invert"
              />
            </figure>
            {/* Ensure card-body itself is a flex container directing column-wise */}
            <div className="flex flex-col items-center text-center flex-grow">
              <h2 className="card-title mt-4">Research </h2>
              <div className="flex justify-center w-full px-4 pb-4 mt-4">
                <Link href="/research">
                  <button className="btn btn-primary">Learn More</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl hover:scale-105 transition-transform duration-200 h-[400px] flex flex-col justify-between">
            <CardWithCarousel
              images={[
                { src: furhat.src, alt: "Image 1", id: "slide1" },
                { src: googleEarth.src, alt: "Image 2", id: "slide2" },
                { src: homePage.src, alt: "Image 3", id: "slide3" },
                // Additional images as needed
              ]}
              className="px-10 pt-10 h-2/3"
            />

            <div className="flex flex-col items-center text-center flex-grow">
              <h2 className="card-title mt-4">Projects</h2>
              <div className="flex justify-center w-full px-4 pb-4 mt-4">
                <Link href="/projects">
                  <button className="btn btn-primary">Learn More</button>
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

      <div
        className="flex flex-col items-center"
        style={{
          backgroundColor: "var(--background-color)",
          color: "var(--text-color)",
        }}
      >
        <p className="text-gray-500 mb-full">
          Made w/ &#160; &#10084; &#160; by Josh
        </p>
        <Link
          href="https://github.com/JoshuaShunk/personal-web"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center pt-2"
        >
          <FaGithub size={20} color="blue" />
        </Link>
      </div>
    </>
  );
}
