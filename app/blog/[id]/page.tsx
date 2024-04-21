"use client";

import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

import { CiShare2 } from "react-icons/ci";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import TypingAnimation from "@/app/TypingAnimation.client";
import ShareDropdown from "../components/shareDropdown";

import "@/app/globals.css"

const getBlogById = async (id: string) => {
  const res = await fetch(`/api/blog/${id}`);
  const data = await res.json();
  return data.post;
};

const ViewBlog = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  // Initializing state with all fields including optional content and date
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    content: "",
    date: "",
  });

  // Inside your component
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // Set the URL once the window is available
    setCurrentUrl(window.location.href);
  }, []);

  useEffect(() => {
    toast.loading("Fetching Blog Details 🚀", { id: "1" });
    getBlogById(params.id)
      .then((data) => {
        setBlog({
          title: data.title,
          description: data.description,
          content: data.content || "No additional content provided.", // Handling potentially undefined content
          date: new Date(data.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }), // Formatting date
        });
        toast.success("Fetching Complete", { id: "1" });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching blog", { id: "1" });
      });
  }, [params.id]);

  return (
    <Fragment>
      <Toaster />
      <main className="min-h-screen ">
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

        <div className="w-full max-w-7xl mx-auto my-4">
          <div className="flex justify-between items-start">
            <div className="w-full">
              <h2 className="prose lg:prose-xl p-6 font-bold text-2xl">
                {blog.description}
              </h2>
              <ReactMarkdown
                rehypePlugins={[rehypeHighlight]}
                className="prose lg:prose-xl p-6 markdown"
              >
                {blog.content}
              </ReactMarkdown>
            </div>
            {/* Share button on the right */}
            <div className="flex-shrink-0 pt-10 pl-6">
              <div className="relative">
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
