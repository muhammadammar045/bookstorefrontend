import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/userAuthSlice";

function Layout() {
  const user = useSelector(selectUser);
  return (
    <div className="my-48">
      {user ? (
        <h1 className="bg-slate-800 p-4 text-center text-5xl font-bold text-white shadow-xl shadow-rose-700">
          Click On The Book Shop To See Books
        </h1>
      ) : (
        <h1 className="bg-slate-800 p-4 text-center text-5xl font-bold text-white shadow-xl shadow-rose-700">
          Click On The Login To See Books
        </h1>
      )}
    </div>
  );
}

export default Layout;
