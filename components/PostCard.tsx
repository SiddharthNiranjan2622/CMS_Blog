import moment from "moment";
import Image from "next/image";
import Link from "next/link";

function PostCard({ post }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md  mb-6">
        <Image
          src={post.node.featuresImage.url}
          className="object-top object-cover shadow-lg rounded-t-lg lg:rounded-lg"
          width={1920}
          height={1080}
        />
      </div>

      <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold">
        <Link href={`/post/${post.node.slug}`}>{post.node.title}</Link>
      </h1>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-full mr-8">
          <Image
            src={post.node.author.photo.url}
            height={40}
            width={40}
            className="rounded-full align-middle"
          />
          <p className="inline align-middle text-gray-700 ml-2 text-lg">
            {post.node.author.author}
          </p>
        </div>
        <div className="font-medium text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{moment(post.node.createdAt).format("MMM DD, YYYY")}</span>
        </div>
      </div>
      <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">{post.node.excerpt}</p>
      <div className="text-center cursor-pointer">
        <Link href={`/post/${post.node.slug}`} >
          <span className="transition duration-500 transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3">Continue Reading</span>
          </Link>
        
        </div>
    </div>
  );
}

export default PostCard;
