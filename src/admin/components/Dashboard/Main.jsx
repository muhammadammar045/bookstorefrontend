import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@loadingState";

import {
  fetchDashboardStatsThunk,
  selectDashboardStats,
  selectDashboardIsLoading,
} from "@storeVars";
import DashboardStatCard from "./TotalCalculation";
import {
  faBox,
  faTag,
  faTags,
  faUsers,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

function Main() {
  const dispatch = useDispatch();
  const stats = useSelector(selectDashboardStats);
  const loading = useSelector(selectDashboardIsLoading);

  useEffect(() => {
    dispatch(fetchDashboardStatsThunk());
  }, [dispatch]);
  return (
    <>
      {console.log(stats)}
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
          {loading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-3 gap-6">
              <DashboardStatCard
                name="Total Users"
                value={stats.users}
                icon={faUsers}
                bgColor="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700"
                textColor="text-white"
              />
              <DashboardStatCard
                name="Total Roles"
                value={stats.roles}
                icon={faUserShield}
                bgColor="bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
                textColor="text-white"
              />
              <DashboardStatCard
                name="Total Permissions"
                value={stats.permissions}
                icon={faTag}
                bgColor="bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
                textColor="text-white"
              />
              <DashboardStatCard
                name="Total Products"
                value={stats.products}
                icon={faBox}
                bgColor="bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700"
                textColor="text-white"
              />
              <DashboardStatCard
                name="Total Categories"
                value={stats.categories}
                icon={faTags}
                bgColor="bg-violet-500 dark:bg-violet-600 hover:bg-violet-600 dark:hover:bg-violet-700"
                textColor="text-white"
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Main;
