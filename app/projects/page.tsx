import React, { useContext } from "react";

import Image, { StaticImageData } from "next/image";

import furhat from "/public/furhat.png";
import googleEarth from "/public/googleEarth.jpg";
import homePage from "/public/homepage.png";
import TypingAnimation from "../TypingAnimation.client";

import "../globals.css";


// Define the type for project data
interface ProjectInfo {
  src: StaticImageData;
  alt: string;
  title: string;
  description: string;
  badge: string;
  link: string;
}

// Array of project data
const projects: ProjectInfo[] = [
  {
    src: furhat,
    alt: "AI Ticketing Agent",
    title: "AI Ticketing Agent",
    description: "The ASCAdmissionBot is a project designed to work with the Furhat robot, providing a series of flows, responses, and utilities to facilitate interactions.",
    badge: "@Arizona Science Center",
    link: "https://github.com/JoshuaShunk/ASCAdmissionBot",
  },
  {
    src: googleEarth,
    alt: "Google Earth",
    title: "Hand Tracking Google Earth Controller",
    description: "Hands free full control of Google Earth desktop application using computer vision.",
    badge: "@Arizona Science Center",
    link: "https://github.com/JoshuaShunk/Ultraleap-Google-Earth-Controller-",
  },
  {
    src: homePage,
    alt: "Personal Website",
    title: "Personal Website",
    description: "React based personal website built with Next.js and TailwindCSS to showcase my projects, research, and resume to potential employers and collaborators.",
    badge: "@Personal",
    link: "https://github.com/JoshuaShunk/personal-web",
  },
];

const ProjectCard = ({ project }: { project: ProjectInfo }) => (
  <div className="card w-96 mx-4 md:mx-0 md:ml-8 bg-base-100 shadow-xl image-full hover:scale-105 transition-transform duration-200" style={{ height: "300px" }}>
    <figure className="relative w-full h-full">
      <Image src={project.src} alt={project.alt} style={{ objectFit: "cover" }} fill />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{project.title}</h2>
      <p>{project.description}</p>
      <div className="card-actions flex justify-between items-center">
        <div className="badge badge-outline">{project.badge}</div>
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          <button className="btn btn-primary">Learn More</button>
        </a>
      </div>
    </div>
  </div>
);

const ProjectPage = () => (
  <div className="bg-base-100" style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}>
    <TypingAnimation text="Projects" className="text-4xl font-bold ml-10 pb-5" />
    <div className="flex flex-wrap items-start gap-4" style={{ minHeight: "200px" }}>
      {projects.map(project => <ProjectCard key={project.title} project={project} />)}
    </div>
  </div>
);

export default ProjectPage;