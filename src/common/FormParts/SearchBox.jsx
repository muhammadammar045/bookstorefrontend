import React, { useState, useDeferredValue, useEffect } from "react";
import { Input } from "@commonPartials";

function SearchBox({ onSearch }) {
  const [filter, setFilter] = useState("");
  const deferredFilter = useDeferredValue(filter);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(deferredFilter);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [deferredFilter, onSearch]);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <Input
      placeholder="Search ..."
      value={filter}
      onChange={handleChange}
    />
  );
}

export default SearchBox;
