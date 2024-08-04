import React from "react";
import Spinner from "./Spinner";

function LogoutSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
      <Spinner />
    </div>
  );
}

export default LogoutSpinner;
