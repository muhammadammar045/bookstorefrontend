import React from "react";
import { AddPermission } from "@adminComponents";

function AddOrUpdatePermission() {
  return (
    <>
      <div className="flex items-center justify-center gap-6 p-12">
        <div className="w-3/6">
          <AddPermission />
        </div>
        <div className="w-2/6"></div>
      </div>
    </>
  );
}

export default AddOrUpdatePermission;
