import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { searchVideos, fetchSuggestions } from "../../redux/slices/videoSlice"; 

const HeaderCenter = ({ isSearchOpen, setIsSearchOpen }) => {
  const searchRef = useRef(null);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { suggestions } = useSelector((state) => state.videos); // ✅ for dropdown
  const dispatch = useDispatch();

  // Main search (Enter / Click Search / Click Suggestion)
  const handleSearch = (query = input) => {
    if (query.trim()) {
      dispatch(searchVideos(query))
        .unwrap()
        .then(() => setShowSuggestions(false))
        .catch((err) => console.error("Search error:", err));
    }
  };

  const handleClear = () => {
    setInput("");
    setShowSuggestions(false);
  };

  // Close search if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setShowSuggestions(false);
      }
    }
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen, setIsSearchOpen]);

  return (
    <>
      {isSearchOpen ? (
        // Mobile search active
        <div
          ref={searchRef}
          className="fixed inset-x-0 top-0 flex flex-col bg-white dark:bg-black px-4 py-2 z-50"
        >
          {/* Top search bar */}
          <div className="flex items-center">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-2xl mr-4 text-black dark:text-white"
            >
              <IoArrowBack />
            </button>

            <div className="flex items-center flex-1 gap-0 relative">
              <input
                type="text"
                placeholder="Search"
                value={input}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-black dark:text-white rounded-l-full px-4 py-2 focus:outline-none"
                onChange={(e) => {
                  const value = e.target.value;
                  setInput(value);

                  if (value.trim()) {
                    dispatch(fetchSuggestions(value)); // ✅ fetch only suggestions
                    setShowSuggestions(true);
                  } else {
                    setShowSuggestions(false);
                  }
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />

              {/* Clear Button */}
              {input && (
                <button
                  onClick={handleClear}
                  className="absolute right-13 text-2xl text-gray-500 hover:text-black dark:hover:text-white p-1 bg-gray-200 dark:bg-[#272727] hover:bg-gray-100 dark:hover:bg-[#272727]"
                >
                  <IoClose />
                </button>
              )}

              <button
                onClick={() => handleSearch()}
                className="px-4 py-2 bg-gray-100 dark:bg-[#272727] border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-full"
              >
                <IoSearchOutline className="text-xl text-black dark:text-white" />
              </button>
            </div>

            <button className="ml-4 p-2">
              <FaMicrophone className="text-lg text-black dark:text-white" />
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <div className="mt-2 bg-white dark:bg-[#1e1e1e] border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-64 overflow-y-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-rounded text-gray-700 dark:text-gray-200 scroll-container-dropdown">
              {suggestions?.length > 0 ? (
                suggestions.map((s, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#2c2c2c] cursor-pointer flex items-center"
                    onClick={() => {
                      setInput(s.title);
                      handleSearch(s.title); // ✅ run real search on click
                    }}
                  >
                    <IoSearchOutline className="text-lg mr-2 text-gray-500 dark:text-gray-400" />
                    <span>{s.title}</span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        // Desktop search
        <div className="hidden md:flex items-center flex-1 max-w-xl px-4 relative">
          <div className="flex w-full relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full border border-gray-300 dark:border-[#272727] bg-white dark:bg-black text-black dark:text-white rounded-l-full px-4 py-2 focus:outline-none"
              value={input}
              onChange={(e) => {
                const value = e.target.value;
                setInput(value);

                if (value.trim()) {
                  dispatch(fetchSuggestions(value));
                  setShowSuggestions(true);
                } else {
                  setShowSuggestions(false);
                }
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            {input && (
             <button
  onClick={handleClear}
  className="absolute top-1 right-13 text-2xl text-gray-500 hover:text-black dark:hover:text-white p-1 bg-gray-200 dark:bg-[#272727] hover:bg-gray-100 dark:hover:bg-[#272727]"
>
  <IoClose />
</button>
            )}

            <button
              onClick={() => handleSearch()}
              className="px-4 py-2 bg-gray-200 dark:bg-[#272727] border border-l-0 border-gray-300 dark:border-[#272727] rounded-r-full hover:bg-white dark:hover:bg-black cursor-pointer"
            >
              <IoSearchOutline className="text-xl text-black dark:text-white" />
            </button>
          </div>

          <button className="ml-3 p-2 border bg-gray-200 border-gray-300 dark:bg-[#272727] dark:border-[#272727] rounded-full hover:bg-white dark:hover:bg-black cursor-pointer">
            <FaMicrophone className="text-lg text-black dark:text-white" />
          </button>

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-12 w-full bg-white dark:bg-[#1e1e1e] border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-64 overflow-y-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-rounded text-gray-700 dark:text-gray-200 scroll-container-dropdown">

              {suggestions?.length > 0 ? (
                suggestions.map((s, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#2c2c2c] cursor-pointer flex items-center"
                    onClick={() => {
                      setInput(s.title);
                      handleSearch(s.title);
                    }}
                  >
                    <IoSearchOutline className="text-lg mr-2 text-gray-500 dark:text-gray-400" />
                    <span>{s.title}</span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
                  No results found
                </div>  
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HeaderCenter;
// fine