// CommentSection.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommentDetails from "./commentCom/CommentDetails";
import { addComment, fetchComments } from "../../redux/slices/commentSlice";

const CommentSection = ({ videoId }) => {
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const comments = useSelector((state) => state.comments.items) || [];
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (videoId) dispatch(fetchComments(videoId));
  }, [dispatch, videoId]);

  const handleSubmit = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (input.trim()) {
      dispatch(addComment({ videoId, text: input, token }));
      setInput("");
      setFocused(false);
    }
  };

  const firstLetter = user?.username?.[0]?.toUpperCase() || "U";

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-3 dark:text-white">
        {comments.length} Comments
      </h3>

      {/* Comment Input */}
      <div className="flex items-start gap-3 mb-6">
        {user ? (
          user.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.username}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
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

        <div className="flex-1">
          <input
            type="text"
            value={input}
            onFocus={() => setFocused(true)}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a comment..."
            className="w-full border-b border-gray-400 dark:border-gray-600 bg-transparent focus:outline-none text-gray-800 dark:text-white"
          />
          {focused && (
            <div className="flex justify-end gap-2 mt-2">
              <button
                 className="px-3 py-1 rounded-lg bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500"
                onClick={() => {
                  setInput("");
                  setFocused(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                 className="px-3 py-1 rounded-lg bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500"
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
// fine