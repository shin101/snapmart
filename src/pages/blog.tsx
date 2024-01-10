import Layout from "@components/layout";
import { readFileSync, readdirSync } from "fs";
import React from "react";
import matter from "gray-matter";
import { NextPage } from "next";

interface Post {
  title: string;
  date: string;
  category?: string;
}

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Layout title="Blog">
      <h1 className="font-semibold mb-10 text-xl">Latest posts:</h1>
      <ul className="mt-20">
        {posts.map((post, i) => (
          <div key={i}>
            <span className="text-lg text-red-500">{post.title}</span>
            <div>
              <span>
                {post.date} / {post.category}
              </span>
            </div>
          </div>
        ))}
      </ul>{" "}
    </Layout>
  );
};

//  getStaticProps : 페이지가 빌드되고, nextjs가 해당 페이지를 export한 후 일반 html로 될때, 딱 한 번만 실행됨

export async function getStaticProps() {
  const blogPosts = readdirSync("src/posts").map((file) => {
    const content = readFileSync(`src/posts/${file}`, "utf-8");
    return matter(content).data;
  });
  return {
    props: { posts: blogPosts },
  };
}

export default Blog;
