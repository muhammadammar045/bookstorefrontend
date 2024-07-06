import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/userAuthSlice";

function Layout() {
  const user = useSelector(selectUser);
  return (
    <div className="my-48">
      {user ? (
        <h1 className="p-4 text-center text-5xl font-bold text-white">
          <span className="bg-slate-800 px-12 italic shadow-xl shadow-rose-700">
            Click On BookShop To See Books
          </span>
        </h1>
      ) : (
        <h1 className="p-4 text-center text-5xl font-bold text-white">
          <span className="bg-slate-800 px-12 italic shadow-xl shadow-rose-700">
            Login To See Books
          </span>
        </h1>
      )}
    </div>
  );
}

export default Layout;
