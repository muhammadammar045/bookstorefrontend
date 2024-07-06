import React from "react";
import { selectUser } from "../store/user/userAuthSlice";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector(selectUser);
  return (
    <div className="my-48">
      {user ? (
        <h1 className="p-4 text-center text-5xl font-bold text-white">
          <span className="bg-slate-800 px-12 italic shadow-xl shadow-rose-700">
            {`Welcome ! ${user?.user?.fullname}`}
          </span>
        </h1>
      ) : (
        <h1 className="p-4 text-center text-5xl font-bold text-white">
          <span className="bg-slate-800 px-12 italic shadow-xl shadow-rose-700">
            Login To Read,Add,Update and Delete Books
          </span>
        </h1>
      )}
    </div>
  );
}

export default Home;
