import { useEffect, useRef, useState } from "react";
import { submitComment } from "../services";

function CommentsForm({ slug }) {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const storeDataEL = useRef();
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  // const [storeData, setStoreData] = useState(false)

  useEffect(() => {
    try {
      setName(window.localStorage.getItem("name"));
      setEmail(window.localStorage.getItem("email"));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleCommentSubmission = async () => {
    setError(false);

    // const { value: comment }: any = commentEl.current;
    // const { value: name }: any = nameEL.current;
    // const { value: email }: any = emailEL.current;
    const { checked: storeData }: any = storeDataEL.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }
    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }
    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>
      <div className="grid-cols-1 gap-4 mb-4">
        <textarea
          value={comment}
          onChange={(text) => setComment(text.target.value)}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          placeholder="Name"
          name="name"
          value={name}
          onChange={(text) => setName(text.target.value)}
          type="text"
          className="py-2 px-2  outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(text) => setEmail(text.target.value)}
          name="email"
          type="text"
          className="py-2 px-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
      </div>
      <div className="grid-cols-1 gap-4 mb-4">
        <div className="">
          <input
            type="checkbox"
            ref={storeDataEL}
            id="storeData"
            value="true"
          />
          <label
            className="text-gray-500 cursor-pointer ml-2"
            htmlFor="storeData"
          >
            Save my e-mail and name for next time I comment
          </label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are required</p>}
      <div className="mt-8">
        <button
          className="transition duration-500 ease hover:bg-indigo-900 bg-pink-600 text-lg rounded-full text-white inline-block px-8 py-3 cursor-pointer "
          onClick={handleCommentSubmission}
          type="button"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment Submitted for review
          </span>
        )}
      </div>
    </div>
  );
}

export default CommentsForm;
