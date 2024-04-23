"use client";

import React from "react";
import Link from "next/link";
import TypingAnimation from "../TypingAnimation.client";

interface Post {
  id: number;
  title: string;
  date: string;
  description: string;
  image?: string; // Optional image URL field
}

async function fetchBlogs(): Promise<Post[]> {
  const res = await fetch("/api/blog", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return data.post;
}

export default function Home() {
  const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    async function loadPosts() {
      const fetchedPosts = await fetchBlogs();
      setPosts(fetchedPosts);
    }
    loadPosts();
  }, []);

  return (
    <main className="min-h-screen ">
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
      <section className="container max-w-7xl mx-auto px-4 md:mx-0 md:ml-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {posts.slice(1).map((post) => (
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
