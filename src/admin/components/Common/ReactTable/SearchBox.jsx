import React from "react";
import { Input } from "../../../../User/components/AllComponents";

function SearchBox({ filter, setFilter }) {
  return (
    <>
      <Input
        placeholder="Search ..."
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </>
  );
}

export default SearchBox;
