import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/user/userApi";
import { useDispatch, useSelector } from "react-redux";
import { selectError } from "../store/user/userAuthSlice";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectError);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="flex h-[350px] items-center justify-center rounded-3xl bg-black">
            <h2 className="text-3xl">Loading Books </h2>
            <PacmanLoader
              className="mx-5"
              color="white"
            />
          </div>
        </>
      ) : (
        <li className="cursor-pointer">
          <button
            onClick={handleLogout}
            className="block rounded px-3 py-2 md:p-0 dark:hover:text-orange-600 md:dark:text-white"
            aria-current="page"
          >
            Logout
          </button>
        </li>
      )}
    </>
  );
}

export default Logout;
