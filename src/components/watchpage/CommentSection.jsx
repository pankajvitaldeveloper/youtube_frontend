import { useState } from "react";

const CommentSection = ({ comments = [] }) => {
  const [input, setInput] = useState("");

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-3 dark:text-white">
        {comments.length} Comments
      </h3>

      {/* Comment Input */}
      <div className="flex items-start gap-3 mb-6">
        <img
          src="/default-avatar.png"
          alt="user"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a comment..."
            className="w-full border-b border-gray-400 dark:border-gray-600 bg-transparent focus:outline-none text-gray-800 dark:text-white"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={() => setInput("")}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              disabled={!input.trim()}
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      {/* Render Comments */}
      <div className="space-y-4">
        {comments.map((c, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <img
              src={c.user?.profileImage || "/default-avatar.png"}
              alt={c.user?.name}
              className="w-9 h-9 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold dark:text-white">
                {c.user?.name || "Anonymous"}
                <span className="text-gray-500 text-xs ml-2">
                  {new Date(c.createdAt).toDateString()}
                </span>
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {c.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
