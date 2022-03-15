import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getRecentPosts, getSimilarPost } from "../services";

const PostWidget = (props) => {



  // console.log('props--------',props)
  const [relatedPosts, setRelatedPosts] = useState([]);
  
  
  useEffect(() => {
    if (props?.post?.slug) {
      
      const categories = props.post.newCategories
      const slug = props.post.slug

      // console.log('first')
      getSimilarPost({categories,slug}).then((result) => setRelatedPosts(result));
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [props?.slug]);

  return (
    <div className="bg-white  shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {props.slug ? "Related Posts" : "Similar Post"}
      </h3>
      {relatedPosts.map((post) => (
        <div className="flex items-center w-full mb-4" key={post.title}>
          <div className="w-16 flex-none">
            <Image
              alt={post.title}
              src={post.featuresImage.url}
              height={60}
              className="align-middle rounded-full object-cover"
              width={60}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 text-sm">
              {moment(post.createdAt).format("MM DD, YYYY")}
            </p>
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
