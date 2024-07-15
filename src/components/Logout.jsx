import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserThunk, selectIsLoading } from "../store/user/userAuthSlice";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserThunk()).unwrap();
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
            className="dark:hover:text-primary md:dark:text-primary block rounded px-3 py-2 md:p-0"
            aria-current="page"
          >
            Logging Out...
          </button>
        </li>
      ) : (
        <li className="cursor-pointer">
          <button
            onClick={handleLogout}
            className="dark:hover:text-primary md:dark:text-primary block rounded px-3 py-2 duration-700 hover:scale-125 md:p-0"
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
