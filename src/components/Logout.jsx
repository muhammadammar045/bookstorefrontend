import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/user/userApi";
import { useDispatch } from "react-redux";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log("first");
      await dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <>
      <li className="cursor-pointer">
        <button
          onClick={handleLogout}
          className="block rounded px-3 py-2 md:p-0 dark:hover:text-orange-600 md:dark:text-white"
          aria-current="page"
        >
          Logout
        </button>
      </li>
    </>
  );
}

export default Logout;
