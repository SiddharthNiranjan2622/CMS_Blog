import Image from "next/image";

function Author({ author }) {
  console.log(author);
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-opacity-20 bg-black">
      <div className="absolute left-0 right-0 -top-14">
        <Image
          alt={author.author}
          height={100}
          width={100}
          className="align-middle rounded-full"
          src={author.photo.url}
        />
      </div>
        <h3 className="text-white my-4 text-xl font-bold">{author.author}</h3>
        <p className="text-white text-lg">{author.bio}</p>
    </div>
    // <h1>author</h1>
  );
}

export default Author;


