import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllRolesThunk,
  selectAllRoles,
  selectRoleIsLoading,
} from "../../../store/role/roleSlice.js";
import { AddRole, ReactTable, SkeletonTable } from "../AllAdminComponents.js";

function AllRolesAdmin() {
  const roles = useSelector(selectAllRoles);
  const dispatch = useDispatch();
  const loading = useSelector(selectRoleIsLoading);

  useEffect(() => {
    dispatch(fetchAllRolesThunk());
  }, [dispatch]);

  const allRoles = useMemo(() => {
    return roles?.map((role) => ({
      id: role._id,
      role: role.roleName,
      permissions: role.permissions?.map((permission) => permission).join(", "),
    }));
  }, [roles]);

  return (
    <>
      <main className="grow">
        <div className="mx-auto w-full max-w-9xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Dashboard actions */}
          <div className="mb-8 sm:flex sm:items-center sm:justify-between">
            {/* Left: Title */}
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-3xl">
                All Roles
              </h1>
            </div>
          </div>

          {/* Content */}

          <div className="relative flex gap-6 overflow-x-auto shadow-md sm:rounded-lg">
            {loading ? (
              <>
                <SkeletonTable
                  rows={3}
                  columns={2}
                />
              </>
            ) : (
              <>
                <div className="w-3/5">
                  <ReactTable data={allRoles} />
                </div>
                <div className="w-2/5">
                  <AddRole />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default AllRolesAdmin;
