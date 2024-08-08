import React, { useEffect } from "react";
import TotalCalculation from "./TotalCalculation";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@loadingState";

import {
  fetchAllUserThunk,
  selectUsers,
  selectUserIsLoading,
  fetchAllRolesThunk,
  selectAllRoles,
  selectRoleIsLoading,
  fetchAllPermissionsThunk,
  selectAllPermissions,
  selectPermissionIsLoading,
  fetchAllUsersBooksThunk,
  selectTotalDocuments,
} from "@storeVars";

function main() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const roles = useSelector(selectAllRoles);
  const permissions = useSelector(selectAllPermissions);
  const books = useSelector(selectTotalDocuments);
  const loadingU = useSelector(selectUserIsLoading);
  const loadingR = useSelector(selectRoleIsLoading);
  const loadingP = useSelector(selectPermissionIsLoading);
  //   const books = useSelector(selectBooks);

  useEffect(() => {
    if (users.length === 0) dispatch(fetchAllUserThunk());
    if (roles.length === 0) dispatch(fetchAllRolesThunk());
    if (permissions.length === 0) dispatch(fetchAllPermissionsThunk());
    dispatch(fetchAllUsersBooksThunk());
  }, [dispatch]);
  return (
    <>
      <main className="grow">
        <div className="mx-auto w-full max-w-9xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Dashboard actions */}
          <div className="mb-8 sm:flex sm:items-center sm:justify-between">
            {/* Left: Title */}
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-3xl">
                Statistics
              </h1>
            </div>
          </div>

          {/* Cards */}
          {loadingU || loadingR || loadingP ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-3 gap-6">
              <TotalCalculation
                name={"Total Users"}
                value={users.length}
              />
              <TotalCalculation
                name={"Total Roles"}
                value={roles.length}
              />
              <TotalCalculation
                name={"Total Permissions"}
                value={permissions.length}
              />
              <TotalCalculation
                name={"Total Books"}
                value={books}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default main;
