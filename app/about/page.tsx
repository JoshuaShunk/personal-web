import React from "react";

const aboutPage = () => {
  return (
    <div className="flex justify-end px-4">
      <div className="w-1/2 flex justify-center items-center">
        <img
          src="joshuaheadshot.jpg"
          alt="Image"
          className="w-2/3 h-auto rounded-xl"
        />
      </div>
      <div className="w-1/2 mx-auto flex flex-col items-center">
        <div className="w-full md:w-3/4 lg:w-4/5 my-5">
          <div
            tabIndex={0}
            className="collapse collapse-plus border border-base-300 bg-base-200 my-5"
          >
            <div className="collapse-title text-xl font-medium">About Me</div>
            <div className="collapse-content">
              <p>
                tabIndex={0} attribute is necessary to make the div focusable
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div
            tabIndex={0}
            className="collapse collapse-plus border border-base-300 bg-base-200"
          >
            <div className="collapse-title text-xl font-medium">Education</div>
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
                              <img
                                src="StanfordLogo.png"
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">Stanford University</div>
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
                              <img
                                src="PerryLogo.png"
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
  );
};

export default aboutPage;
