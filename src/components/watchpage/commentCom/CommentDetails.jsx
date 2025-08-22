import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateComment, deleteComment } from "../../../redux/slices/commentSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const CommentDetails = ({ comment }) => {
  const authorId =
    typeof comment.userId === "object" ? comment.userId?._id : comment.userId;
  const userObj = typeof comment.userId === "object" ? comment.userId : null;
  const username = userObj?.username || "Anonymous";
  const profileImage = userObj?.profileImage;
  const firstLetter = username?.[0]?.toUpperCase() || "U";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [showEmoji, setShowEmoji] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const currentUserId = useSelector((state) => state.auth.user?._id);

  const wrapperRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const isOwner = !!currentUserId && !!authorId && currentUserId === authorId;

  const handleUpdate = () => {
    if (!editText.trim()) return;
    dispatch(updateComment({ id: comment._id, text: editText, token }));
    setIsEditing(false);
    setShowEmoji(false);
  };

  const handleDelete = () => {
    dispatch(deleteComment({ id: comment._id, token }));
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setShowEmoji(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-start gap-3 relative" ref={wrapperRef}>
      {profileImage ? (
        <img
          src={profileImage}
          alt={username}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-500 flex items-center justify-center text-white font-semibold">
          {firstLetter}
        </div>
      )}

      <div className="flex-1">
        <p className="font-semibold">
          @{username.toLowerCase()}{" "}
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {new Date(comment.timestamp).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </p>

        {isEditing ? (
          <div className="mt-1 relative">
            <input
              value={editText}
              onFocus={() => setShowEmoji(false)}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full border-b border-gray-400 dark:border-gray-600 bg-transparent focus:outline-none text-gray-800 dark:text-white py-2"
            />
            <div className="flex items-center justify-between mt-2">
              <button
                type="button"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => setShowEmoji(!showEmoji)}
              >
                <BsEmojiSmile size={20} />
              </button>
              {showEmoji && (
                <div
                  ref={emojiPickerRef}
                  className="absolute z-50"
                  style={{
                    top: "100%",
                    left: 0,
                  }}
                >
                  <Picker
                    data={data}
                    onEmojiSelect={(emoji) =>
                      setEditText((prev) => prev + emoji.native)
                    }
                    theme="auto"
                    emojiSize={20}
                    perLine={8}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-gray-700 text-white dark:bg-gray-700 dark:text-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black "
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setShowEmoji(false);
                }}
                className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
        )}

        {/* Like/Dislike/Reply Section */}
        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 mt-1 text-sm">
          <button className="flex items-center gap-1">
            <AiOutlineLike size={18} /> {comment.likes || 0}
          </button>
          <button className="flex items-center gap-1">
            <AiOutlineDislike size={18} /> {comment.dislikes || 0}
          </button>
          <button className="font-medium">Reply</button>
        </div>
      </div>

      {isOwner && (
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
          >
            <BsThreeDotsVertical size={18} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white text-black dark:bg-gray-800 dark:text-white shadow-lg border rounded-md text-sm z-50 origin-top-right transition-all duration-200 ease-in-out">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="block w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentDetails;