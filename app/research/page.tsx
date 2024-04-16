import Image, { StaticImageData } from "next/image";
import React from "react";

import nsDropout from "/public/nsDropout.svg";
import TypingAnimation from "../TypingAnimation.client";

// Define the type for project data
interface ResearchInfo {
  src: StaticImageData;
  alt: string;
  title: string;
  description: string;
  badge?: string;
  link: string;
}

// Array of project data
const research: ResearchInfo[] = [
  {
    src: nsDropout,
    alt: "Neruon-specific Dropout",
    title: "Neruon-specific Dropout",
    description:
      "An innovative approach to regularization in neural networks, aiming to reduce overfitting and the dependence on large training datasets by selectively deactivating neurons",
    link: "https://arxiv.org/abs/2201.06938",
  },
];

const ResearchCard = ({ research }: { research: ResearchInfo }) => (
  <div
    className="card w-96 mx-4 md:mx-0 md:ml-8 bg-base-100 shadow-xl image-full hover:scale-105 transition-transform duration-200"
    style={{ height: "300px" }}
  >
    <figure className="relative w-full h-full">
      <Image
        src={research.src}
        alt={research.alt}
        style={{ objectFit: "cover" }}
        fill
      />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{research.title}</h2>
      <p>{research.description}</p>
      <div className="card-actions flex justify-between items-center w-full">
        {research.badge ? (
          <div className="badge badge-outline">{research.badge}</div>
        ) : (
          <div></div>
        )}
        <a href={research.link} target="_blank" rel="noopener noreferrer">
          <button className="btn btn-primary">Learn More</button>
        </a>
      </div>
    </div>
  </div>
);

const ResearchPage = () => (
  <div
    className="bg-base-100"
    style={{
      backgroundColor: "var(--background-color)",
      color: "var(--text-color)",
    }}
  >
    <TypingAnimation
      text="Research"
      className="text-4xl font-bold ml-10 pb-5"
    />
    <div
      className="flex flex-wrap items-start gap-4"
      style={{ minHeight: "200px" }}
    >
      {research.map((research) => (
        <ResearchCard key={research.title} research={research} />
      ))}
    </div>
  </div>
);

export default ResearchPage;
