import React from "react";
import Image from "next/image";

import furhat from "/public/furhat.png";
import googleEarth from "/public/googleEarth.jpg";
import homePage from "/public/homepage.png";
import TypingAnimation from "../TypingAnimation.client";

const projectPage = () => {
  return (
    <>
      <TypingAnimation
        text="Projects"
        className="text-4xl font-bold ml-10 pb-5"
      />
      <div
        className="flex flex-wrap items-start gap-4"
        style={{ minHeight: "200px" }}
      >
        <div
          className="card w-96 mx-4 md:mx-0 md:ml-8 bg-base-100 shadow-xl image-full hover:scale-105 transition-transform duration-200"
          style={{ height: "300px" }}
        >
          <figure className="relative w-full h-full">
            <Image
              src={furhat.src}
              alt="AI Ticketing Agent"
              style={{ objectFit: "cover" }}
              fill // This replaces layout="fill"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">AI Ticketing Agent</h2>
            <p>
              The ASCAdmissionBot is a project designed to work with the Furhat
              robot, providing a series of flows, responses, and utilities to
              facilitate interactions.
            </p>
            <div className="card-actions flex justify-between items-center">
              <div className="badge badge-outline">@Arizona Science Center</div>
              <a
                href="https://github.com/JoshuaShunk/ASCAdmissionBot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-primary">Learn More</button>
              </a>
            </div>
          </div>
        </div>
        <div
          className="card w-96 mx-4 md:mx-0 md:ml-8 bg-base-100 shadow-xl image-full hover:scale-105 transition-transform duration-200"
          style={{ height: "300px" }}
        >
          <figure className="relative w-full h-full">
            <Image
              src={googleEarth.src}
              alt="Google Earth"
              style={{ objectFit: "cover" }}
              fill // This replaces layout="fill"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Hand Tracking Google Earth Controller
            </h2>
            <p>
              Hands free full control of Google Earth desktop application using
              computer vision.
            </p>
            <div className="card-actions flex justify-between items-center">
              <div className="badge badge-outline">@Arizona Science Center</div>
              <a
                href="https://github.com/JoshuaShunk/Ultraleap-Google-Earth-Controller-"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-primary">Learn More</button>
              </a>
            </div>
          </div>
        </div>
        <div
          className="card w-96 mx-4 md:mx-0 md:ml-8 bg-base-100 shadow-xl image-full hover:scale-105 transition-transform duration-200"
          style={{ height: "300px" }}
        >
          <figure className="relative w-full h-full">
            <Image
              src={homePage.src}
              alt="Google Earth"
              style={{ objectFit: "cover" }}
              fill
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Personal Website</h2>
            <p>
              React based personal website built with Next.js and TailwindCSS to
              showcase my projects, research, and resume to potential employers
              and collaborators.
            </p>
            <div className="card-actions flex justify-between items-center">
              <div className="badge badge-outline">@Personal</div>
              <a
                href="https://github.com/JoshuaShunk/personal-web"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-primary">Learn More</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default projectPage;
