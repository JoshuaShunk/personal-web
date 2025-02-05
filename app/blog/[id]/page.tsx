"use client";

import { Fragment, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import ShareDropdown from "../components/shareDropdown";
import "@/app/globals.css";

const getBlogById = async (id: string) => {
  const res = await fetch(`/api/blog/${id}`);
  const data = await res.json();
  return data.post;
};

const ViewBlog = ({ params }: { params: { id: string } }) => {
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    content: "",
    date: "",
    image: "",
  });
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  useEffect(() => {
    toast.loading("Fetching Blog Details 🚀", { id: "1" });
    getBlogById(params.id)
      .then((data) => {
        setBlog({
          title: data.title,
          description: data.description,
          content: data.content || "No additional content provided.",
          date: new Date(data.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          image: data.image,
        });
        toast.success("Fetching Complete", { id: "1" });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error fetching blog", { id: "1" });
      });
  }, [params.id]);

  return (
    <Fragment>
      <Toaster />
      <main className="min-h-screen">
        <header className="py-8 mb-12 shadow">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-sm breadcrumbs mb-4">
              <ul>
                <li>
                  <a href="/blog" className="text-blue-600">
                    Blog
                  </a>
                </li>
                <li>{blog.title}</li>
              </ul>
            </div>
            <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
            <p className="text-md">{blog.date} &#x2022; Joshua Shunk</p>
          </div>
        </header>

        {/* Mobile Share Button */}
        <div className="block sm:hidden max-w-7xl mx-auto px-4 mb-4">
          <ShareDropdown url={currentUrl} title={blog.title} isMobile />
        </div>

        <div className="w-full max-w-7xl mx-auto my-4">
          <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start">
            {/* Blog content column */}
            <div className="flex-1 max-w-3xl">
              <div className="relative pb-2 px-4 sm:px-5">
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={`Cover for ${blog.title}`}
                    style={{
                      maxHeight: "300px",
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                    className="rounded-lg max-w-full"
                  />
                )}
              </div>
              <h2 className="prose lg:prose-xl p-6 font-bold text-2xl">
                {blog.description}
              </h2>
              {/* Use only break-words, remove break-all */}
              <ReactMarkdown
                rehypePlugins={[rehypeHighlight]}
                className="prose lg:prose-xl p-6 markdown break-words"
              >
                {blog.content}
              </ReactMarkdown>
            </div>
            {/* Desktop Share Button */}
            <div className="hidden sm:block flex-shrink-0 pt-10 pl-6">
              <div className="relative pr-2">
                <div className="border-b border-gray-200 pb-2">
                  <h3 className="text-lg font-semibold">Quick Links</h3>
                </div>
                <ShareDropdown url={currentUrl} title={blog.title} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default ViewBlog;
