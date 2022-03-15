import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Categories from "../components/Categories";
import PostCard from "../components/PostCard";
import PostWidget from "../components/PostWidget";
import { getPosts } from "../services";

export default function Home({ posts }) {
  return (
    <div className="container mx-auto mb-8  px-10">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 gap-12  lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => {
            return <PostCard key={index} post={post} />;
          })}
        </div>
        <div className="col-span-1 lg:col-span-4 ">
          <div className="top8 relative lg:sticky">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = (await getPosts()) || [];

  return {
    props: {
      posts,
    },
  };
};