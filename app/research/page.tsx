import Image from 'next/image';
import React from 'react'

import nsDropout from '/public/nsDropout.svg'
import TypingAnimation from '../TypingAnimation.client';

const researchPage = () => {
  return (
    <>
      <TypingAnimation
        text="Research"
        className="text-4xl font-bold ml-10 pb-5"
      />
      <div className="card w-96 bg-base-100 shadow-xl image-full mx-9 hover:scale-105 transition-transform duration-200">
        <figure>
          <Image src={nsDropout.src} alt="Shoes" width={500} height={300} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Neruon-specific Dropout</h2>
          <p>
            An innovative approach to regularization in neural networks, aiming
            to reduce overfitting and the dependence on large training datasets
            by selectively deactivating neurons{" "}
          </p>
          <div className="card-actions justify-end">
            <a
              href="https://arxiv.org/abs/2201.06938"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn btn-primary">Learn More</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default researchPage