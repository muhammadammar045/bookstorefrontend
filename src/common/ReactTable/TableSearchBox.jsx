import React from "react";
import { Input } from "@commonPartials";

function TableSearchBox({ filter, setFilter }) {
  return (
    <Input
      value={filter || ""}
      onChange={(e) => setFilter(e.target.value)}
      placeholder="Search..."
    />
  );
}

export default TableSearchBox;
