"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import TypingAnimation from "../TypingAnimation.client";

import { fetcher } from "./components/fetcher";

interface Post {
  id: number;
  title: string;
  date: string;
  description: string;
  image?: string;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function loadPosts() {
      const fetchedPosts = await fetcher("/api/blog");
      setPosts(fetchedPosts);
    }
    loadPosts();
  }, []);

  const filteredPosts = posts
    .slice(1) // Assuming the first post is the featured one
    .filter((post: Post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <main className="min-h-screen">
      <header className="py-8 mb-12 shadow">
        <div className="container max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center">
          <TypingAnimation text="The Blog" className="text-6xl font-bold" />
          {posts.length > 0 && (
            <div className="ml-5 pl-2 p-6 max-w-md relative">
              <Link
                href={`/blog/${posts[0].id}`}
                className="text-3xl font-semibold hover:text-blue-600"
              >
                {posts[0].title}
              </Link>
              <p className="text-sm mt-1">
                {new Date(posts[0].date).toLocaleDateString()}
              </p>
              <p className="mt-4 text-lg">{posts[0].description}</p>
              <Link
                href={`/blog/${posts[0].id}`}
                className="text-blue-600 hover:underline mt-4 inline-block"
              >
                Read More
              </Link>
              <span className="badge badge-primary absolute mt-4 right-4">
                Featured
              </span>
            </div>
          )}
        </div>
      </header>
      <div className="flex justify-center w-full px-4">
        <input
          type="text"
          placeholder="Search blog posts..."
          className="p-2 border border-gray-300 rounded-md mb-6 w-full mx-7 sm:w-2/3 md:w-1/2 lg:w-1/3"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <section className="container max-w-7xl mx-auto px-4 md:mx-0 md:ml-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {filteredPosts.map((post: Post) => (
            <article
              key={post.id}
              className="shadow-md hover:shadow-lg rounded-lg p-6 transition duration-200 ease-in-out"
            >
              <div className="flex flex-col justify-between h-full">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <div className="flex justify-between items-center mt-3">
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-2xl font-semibold hover:text-blue-600 flex-grow"
                  >
                    {post.title}
                  </Link>
                  <p className="text-sm mt-1">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
                <p className="mt-4 mb-4">{post.description}</p>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-blue-600 hover:underline mt-auto"
                >
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
