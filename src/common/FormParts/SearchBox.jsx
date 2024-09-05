import React, { useState, useEffect } from "react";
import { Input } from "@commonPartials";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, selectSearchQuery } from "@storeVars";
import debounce from "lodash/debounce";
import { FaSearch, FaTimes } from "react-icons/fa"; // Importing search and cross icons

function SearchBox() {
  const dispatch = useDispatch();
  const searchValue = useSelector(selectSearchQuery);
  const [searchTerm, setSearchTerm] = useState(searchValue);
  const [isInputVisible, setIsInputVisible] = useState(false); // State to toggle input visibility

  const debouncedDispatch = debounce((value) => {
    dispatch(setSearchQuery(value));
  }, 700);

  useEffect(() => {
    debouncedDispatch(searchTerm);
  }, [searchTerm, debouncedDispatch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleInputVisibility = () => {
    setIsInputVisible((prev) => !prev); // Toggle the visibility of the input box
    setSearchTerm(""); // Clear the search term when toggling
  };

  return (
    <div className="flex items-center">
      {isInputVisible ? (
        <div className="relative flex items-center">
          <Input
            placeholder="Search ..."
            value={searchTerm}
            onChange={handleChange}
            className="mr-2" // Adding some margin to separate input and cross button
          />
          <button
            onClick={toggleInputVisibility}
            className="absolute right-3 text-gray-500"
          >
            <FaTimes size={20} /> {/* Cross icon */}
          </button>
        </div>
      ) : (
        <button
          onClick={toggleInputVisibility}
          className="text-gray-500"
        >
          <FaSearch size={20} /> {/* Search icon */}
        </button>
      )}
    </div>
  );
}

export default SearchBox;
