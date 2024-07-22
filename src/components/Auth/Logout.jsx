import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUserThunk,
  selectIsLoading,
} from "../../store/user/userAuthSlice";
import showToast from "../../toastAlert/toaster";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectIsLoading);

  const handleLogout = async () => {
    try {
      const res = await dispatch(logoutUserThunk()).unwrap();
      showToast("success", `${res.message}`);
      navigate("/login");
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  return (
    <li className="cursor-pointer">
      <button
        onClick={handleLogout}
        className={`block rounded px-3 py-2 transition duration-300 md:p-0 ${
          loading
            ? "text-violet-300 dark:text-violet-300"
            : "text-gray-900 dark:text-gray-200"
        }`}
        aria-current="page"
      >
        {loading ? "Logging Out..." : "Logout"}
      </button>
    </li>
  );
}

export default Logout;
