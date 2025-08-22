// CommentDetails.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateComment, deleteComment } from "../../../redux/slices/commentSlice";
import { BsThreeDotsVertical } from "react-icons/bs";

const CommentDetails = ({ comment }) => {
  // userId can be object (populated) or string (id)
  const authorId =
    typeof comment.userId === "object" ? comment.userId?._id : comment.userId;
const userObj = typeof comment.userId === "object" ? comment.userId : null;
const username = userObj?.username || "Anonymous";

  const profileImage = userObj?.profileImage;
  const firstLetter = username?.[0]?.toUpperCase() || "U";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const currentUserId = useSelector((state) => state.auth.user?._id);

  const isOwner = !!currentUserId && !!authorId && currentUserId === authorId;

  const handleUpdate = () => {
    if (!editText.trim()) return;
    dispatch(updateComment({ id: comment._id, text: editText, token }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteComment({ id: comment._id, token }));
    setIsMenuOpen(false);
  };

  return (
    <div className="flex items-start gap-3 relative">
      {/* Avatar */}
      {profileImage ? (
        <img
          src={profileImage}
          alt={username}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-semibold">
          {firstLetter}
        </div>
      )}

      {/* Content */}
      <div className="flex-1">
        <p className="font-semibold text-gray-900 dark:text-gray-200">
          {username}
        </p>

        {isEditing ? (
          <div className="flex gap-2 mt-1">
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="border rounded p-1 flex-1"
            />
            <button
              onClick={handleUpdate}
              className="px-2 py-1 bg-blue-500 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-2 py-1 bg-gray-300 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
        )}
      </div>

      {/* Menu (only for owner) */}
      {isOwner && (
        <div className="relative z-50">
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <BsThreeDotsVertical size={18} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-28 bg-white text-black dark:bg-black dark:text-white shadow-lg border rounded-md text-sm">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="block w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800"
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
