import React from "react";
import Image from "next/image";


const aboutPage = () => {
  return (
    <>
      <h1 className="text-4xl font-bold ml-10">About Me</h1>
      <div className="flex justify-end px-4">
        <div className="w-1/2 flex justify-center items-center">
          <Image
            src="/joshuaheadshot.jpg"
            alt="Image"
            className="w-2/3 h-auto rounded-xl"
          />
        </div>
        <div className="w-1/2 mx-auto flex flex-col items-center">
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
                  achieving a GPA of 4.91. At the Regeneron Science Talent
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
                  optimization, I is poised to leverage artificial intelligence
                  to address global challenges and welcomes opportunities for
                  strategic collaboration.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/4 lg:w-4/5">
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
                                  alt="Avatar Tailwind CSS Component"
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
                        <th>
                          <button className="btn btn-ghost btn-xs">
                            details
                          </button>
                        </th>
                      </tr>
                      {/* row 2 */}
                      <tr>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <Image
                                  src="/PerryLogo.png"
                                  alt="Avatar Tailwind CSS Component"
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
                        <td>4.92</td>
                        <th>
                          <button className="btn btn-ghost btn-xs">
                            details
                          </button>
                        </th>
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
