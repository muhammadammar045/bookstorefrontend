import React from "react";
import { AddUsersAdmin, AssignRoleAdmin } from "@adminComponents";

function AddOrUpdateUser() {
  return (
    <>
      <div className="flex items-center justify-center gap-6 p-12">
        <div className="w-3/6">
          <AddUsersAdmin />
        </div>
        <div className="w-2/6">
          <AssignRoleAdmin />
        </div>
      </div>
    </>
  );
}

export default AddOrUpdateUser;
