import React from "react";
import { AddOrUpdateCategory as AddOrUpdateCategoryComp } from "@adminComponents";

function AddOrUpdateCategory() {
  return (
    <>
      <div className="flex items-center justify-center gap-6 p-12">
        <div className="w-3/6">
          <AddOrUpdateCategoryComp />
        </div>
        <div className="w-2/6"></div>
      </div>
    </>
  );
}

export default AddOrUpdateCategory;
