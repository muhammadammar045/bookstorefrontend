import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserThunk, selectUserIsLoading } from "@storeVars";
import showToast from "@utils/toastAlert/toaster";
import { LogoutSpinner } from "@loadingState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectUserIsLoading);

  const handleLogout = async () => {
    try {
      const res = await dispatch(logoutUserThunk()).unwrap();
      showToast("success", `${res.message}`);
      navigate("/");
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center px-2">
        <FontAwesomeIcon
          onClick={handleLogout}
          className="cursor-pointer text-2xl text-red-600 duration-700 hover:scale-125 hover:text-violet-700 dark:text-red-600 dark:hover:text-violet-300"
          icon={faSignOut}
        />
      </div>
      {loading && <LogoutSpinner />}
    </>
  );
}

export default Logout;
