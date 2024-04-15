import React from "react";
import Image from "next/image";
import TypingAnimation from "../TypingAnimation.client";

const aboutPage = () => {
  return (
    <>
      <TypingAnimation
        text="About Me"
        className="text-4xl font-bold ml-10 pb-5"
      />
      <div className="flex flex-col md:flex-row justify-end px-4">
        <div className="md:w-1/2 flex justify-center md:justify-center items-center">
          <Image
            src="/joshuaheadshot.jpg"
            alt="Joshua Shunk"
            width={500} // specify a width
            height={500} // and height to ensure proper aspect ratio
            className="w-2/3 md:w-full h-auto rounded-xl"
          />
        </div>
        <div className="w-full md:max-w-xs lg:max-w-md xl:max-w-lg mx-auto">
          <div className="w-full md:w-3/4 lg:w-4/5">
            <div
              tabIndex={0}
              className="collapse collapse-open border border-base-300 bg-base-200 my-5"
            >
              <div className="collapse-title text-xl font-medium">About Me</div>
              <div className="collapse-content">
                <p>
                  Hi my name is Joshua Shunk! I am an undergraduate student of
                  Computer Science at Stanford University. I completed my high
                  school education as the valedictorian of Perry High School,
                  achieving a GPA of 4.87. At the Regeneron Science Talent
                  Search, I was recognized for the development of
                  &quot;neuron-specific dropout&quot;. Beyond my academic and
                  research achievements, I have demonstrated exemplary
                  leadership in various extracurricular endeavors. As the
                  Captain of the Varsity Division 1 Team for Basha-Perry Hockey,
                  I exemplified dedication to athletics while maintaining
                  academic excellence. In addition, I served as the President of
                  the National Honors Society and the Math Club at Perry High
                  School, initiating several transformative and inclusive
                  projects. With a comprehensive foundation in Python and Java
                  programming and a specialization in neural network
                  optimization, I am poised to leverage artificial intelligence
                  to address global challenges and welcome opportunities for
                  strategic collaboration.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:max-w-xs lg:max-w-md xl:max-w-lg mx-auto">
            <div
              tabIndex={0}
              className="collapse collapse-open border border-base-300 bg-base-200"
            >
              <div className="collapse-title text-xl font-medium">
                Education
              </div>
              <div className="collapse-content">
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>School</th>
                        <th>Major/Focus</th>
                        <th>GPA</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      <tr>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-14 h-14">
                                <Image
                                  src="/StanfordLogo.png"
                                  alt="Stanford Logo"
                                  width={56}
                                  height={56}
                                  layout="responsive"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">
                                Stanford University
                              </div>
                              <div className="text-sm opacity-50">
                                Stanford, CA, United States
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          Computer Science
                          <br />
                          <span className="badge badge-ghost badge-sm">
                            Artificial Intelligence
                          </span>
                        </td>
                        <td>3.8</td>
                      </tr>
                      {/* row 2 */}
                      <tr>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <Image
                                  src="/PerryLogo.png"
                                  alt="Perry High School Logo"
                                  width={56}
                                  height={56}
                                  layout="responsive"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">Perry High School</div>
                              <div className="text-sm opacity-50">
                                Gilbert, AZ, United States
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          N/A
                          <br />
                        </td>
                        <td>4.87</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default aboutPage;
