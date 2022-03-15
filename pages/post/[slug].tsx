import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import Author from "../../components/Author";
import Categories from "../../components/Categories";
import Comments from "../../components/Comments";
import CommentsForm from "../../components/CommentsForm";
import Loader from "../../components/Loader";
import PostDetail from "../../components/PostDetail";
import PostWidget from "../../components/PostWidget";
import { getPostDetails } from "../../services";

function PostDetails({ post }) {
  const newCategories = post.categories.map((category) => category.slug);
  const newPost = {...post,newCategories}

  const router = useRouter()

  if(router.isFallback){
    return <Loader/>
  }
  

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <PostWidget post={newPost} />
          <Categories />
        </div>
      </div>
    </div>
  );
}

export default PostDetails;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getPostDetails(params.slug);

  return {
    props: {
      post: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
