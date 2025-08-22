import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommentDetails from "./commentCom/CommentDetails";
import { addComment, fetchComments } from "../../redux/slices/commentSlice";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { BsEmojiSmile } from "react-icons/bs";

const CommentSection = ({ videoId }) => {
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const comments = useSelector((state) => state.comments.items) || [];
  const { token, user } = useSelector((state) => state.auth);

  const wrapperRef = useRef(null); // Ref for the entire comment input area
  const emojiButtonRef = useRef(null); // Ref for the emoji button to position picker

  useEffect(() => {
    if (videoId) dispatch(fetchComments(videoId));
  }, [dispatch, videoId]);

  useEffect(() => {
    // Handle click outside to close emoji picker
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        emojiButtonRef.current !== event.target // Exclude emoji button itself
      ) {
        setShowEmoji(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (input.trim()) {
      dispatch(addComment({ videoId, text: input, token }));
      setInput("");
      setFocused(false);
      setShowEmoji(false);
    }
  };

  const firstLetter = user?.username?.[0]?.toUpperCase() || "U";

  return (
    <div className="mt-6" ref={wrapperRef}>
      <h3 className="font-semibold mb-3 dark:text-white">
        {comments.length} Comments
      </h3>

      {/* Comment Input */}
      <div className="flex items-start gap-3 mb-6 relative">
        {user ? (
          user.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.username}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-gray-400 flex items-center justify-center text-white font-semibold">
              {firstLetter}
            </div>
          )
        ) : (
          <img
            src="/default-avatar.png"
            alt="guest"
            className="w-10 h-10 rounded-full"
          />
        )}

        <div className="flex-1 w-full">
          <input
            type="text"
            value={input}
            onFocus={() => {
              setFocused(true);
              setShowEmoji(false); // Close emoji picker when input is clicked
            }}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a comment..."
            className="w-full border-b border-gray-400 dark:border-gray-600 bg-transparent focus:outline-none text-gray-800 dark:text-white py-2"
          />
          <div className="flex items-center justify-between mt-2">
            <button
              ref={emojiButtonRef} // Attach ref to emoji button
              type="button"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={() => setShowEmoji(!showEmoji)}
            >
              <BsEmojiSmile size={20} />
            </button>
            {showEmoji && (
              <div
                className="absolute z-50"
                style={{
                  top: "100%", // Position below the emoji button
                  left: 0,
                }}
              >
                <Picker
                  data={data}
                  onEmojiSelect={(emoji) => setInput((prev) => prev + emoji.native)}
                  theme="auto"
                  emojiSize={20}
                  perLine={8}
                />
              </div>
            )}
          </div>

          {focused && (
            <div className="flex justify-end gap-2 mt-2">
              <button
                className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                onClick={() => {
                  setInput("");
                  setFocused(false);
                  setShowEmoji(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className={`px-3 py-1 rounded-lg ${
                  input.trim()
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
                disabled={!input.trim()}
              >
                Comment
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Render Comments */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((c) => (
            <CommentDetails key={c._id} comment={c} videoId={videoId} />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;