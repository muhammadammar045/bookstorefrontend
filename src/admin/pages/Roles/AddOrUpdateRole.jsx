import React from "react";
import { AddRole, AssignPermissionToRole } from "@adminComponents";

function AddOrUpdateRole() {
  return (
    <>
      <div className="flex items-center justify-center gap-6 p-12">
        <div className="w-3/6">
          <AddRole />
        </div>
        <div className="w-2/6">
          <AssignPermissionToRole />
        </div>
      </div>
    </>
  );
}

export default AddOrUpdateRole;
