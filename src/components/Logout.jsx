import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/user/userApi";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading } from "../store/user/userAuthSlice";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

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
        <li className="cursor-pointer">
          <button
            onClick={handleLogout}
            className="block rounded px-3 py-2 md:p-0 dark:hover:text-orange-600 md:dark:text-white"
            aria-current="page"
          >
            Logout
          </button>
        </li>
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
